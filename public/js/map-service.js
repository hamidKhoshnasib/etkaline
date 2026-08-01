(function () {
  "use strict";

  var baseUrl = "https://map.etkala.ir";
  var ip = baseUrl;

  var cssFiles = [
    "/service/css/ol.css",
    "/service/css/ol-ext.css",
    "/service/font-awesome-master/css/font-awesome.css",
    "/service/css/mapService.css",
  ];
  var jsFiles = [
    "/service/mapLib/ol.js",
    "/service/mapLib/jquery-3.7.1.js",
    "/service/mapLib/ol-ext.js",
    "/service/mapLib/turf.js",
    "/service/mapLib/proj4.js",
  ];

  var cssLoaded = 0;
  var jsLoaded = 0;

  function checkReady() {
    if (cssLoaded >= cssFiles.length && jsLoaded >= jsFiles.length) {
      defineMapService();
    }
  }

  function loadCSS(href) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = baseUrl + href;
    link.onload = function () {
      cssLoaded++;
      checkReady();
    };
    link.onerror = function () {
      cssLoaded++;
      checkReady();
    };
    document.head.appendChild(link);
  }

  function loadScript(src, index) {
    var script = document.createElement("script");
    script.src = baseUrl + src;
    script.onload = function () {
      jsLoaded++;
      checkReady();
      if (jsLoaded < jsFiles.length) {
        loadNext(index + 1);
      }
    };
    script.onerror = function () {
      jsLoaded++;
      checkReady();
      if (jsLoaded < jsFiles.length) {
        loadNext(index + 1);
      }
    };
    document.body.appendChild(script);
  }

  function loadNext(index) {
    if (index < jsFiles.length) {
      loadScript(jsFiles[index], index);
    }
  }

  cssFiles.forEach(loadCSS);
  loadNext(0);

  function defineMapService() {
    window.MapService = window.MapService || MapService;

    if (window._mapServiceResolve) {
      window._mapServiceResolve(window.MapService);
    }
    window.mapServiceReady = Promise.resolve(window.MapService);

    document.dispatchEvent(new Event("mapServiceReady"));
  }

  window.mapServiceReady =
    window.mapServiceReady ||
    new Promise(function (resolve) {
      window._mapServiceResolve = resolve;
    });

  /**
   * @module examples.main
   */
  class MapService {
    constructor(mapOptions) {
      var th = this;

      var options = mapOptions || {};
      th.mapOptions = mapOptions;
      this.center = options.center;
      this.zoom = options.zoom;
      this.editable = mapOptions.editable;
      this.createMap(th.mapOptions.map);
      this.treeD = true;
      if (options.editable == true) {
        this.vectoredit = new ol.layer.Vector({
          title: "لایه ویرایش",
          myLayerType: 1,
          source: new ol.source.Vector(),
        });
        this.vectoredit.set("altitudeMode", "clampToGround");
        this.ol2d.addLayer(this.vectoredit);
        if (options.editJson != undefined)
          this.addFeatures(options.editJson, this.vectoredit);

        if (mapOptions.editable) this.createTools(this.ol2d);
      } else {
        function featureStyle(f) {
          var sel = f.get("features");
          if (sel) {
            var type = sel[0].get("type");
            var style = styleCache[type];
            if (!style) {
              var color = ol.style.Chart.colors.classic[type];
              style = styleCache[type] = new ol.style.Style({
                image: new ol.style.Icon({
                  anchor: [0.5, 0.5],
                  anchorXUnits: "fraction",
                  anchorYUnits: "fraction",
                  scale: 1,
                  src: "png/" + form[type] + ".png",
                }),
                stroke: new ol.style.Stroke({
                  color: "#fff",
                  width: 1,
                }),
              });
            }
            return [style];
          } else
            return [
              new ol.style.Style({
                stroke: new ol.style.Stroke({
                  color: "#fff",
                  width: 1,
                }),
              }),
            ];
        }
        this.selectCluster = new ol.interaction.Select({
          condition: ol.events.click,
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: "#5fba6a38",
            }),
            stroke: new ol.style.Stroke({
              color: "red",
              width: 3,
              opacity: 1,
            }),
          }),
        });

        this.ol2d.addInteraction(this.selectCluster);
        this.popup = new ol.Overlay.PopupFeature({
          popupClass: "default anim",
          select: this.selectCluster,
          canFix: true,
          template: {
            title: function (f) {
              this.attributes = {};
              for (var i in f.getProperties())
                if (i != "geometry" && i != "style") {
                  this.attributes[i] = i;
                }
              return "";
            },
          },
        });
        this.ol2d.addOverlay(this.popup);
        this.selectCluster.on("select", function (e) {
          if (e.selected.length > 0) {
            var style_selected = new ol.style.Style({
              image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                  width: 1.5,
                  color: [255, 128, 0],
                }),
                fill: new ol.style.Fill({ color: [255, 128, 0] }),
              }),
              fill: new ol.style.Fill({
                color: "#5fba6a38",
              }),
              stroke: new ol.style.Stroke({
                color: "red",
                width: 3,
                opacity: 1,
              }),
            });
            let f = th.selectCluster.getFeatures();
            if (e.deselected.length > 0) {
              e.deselected[0].setStyle(e.deselected[0].oldStyle);
            }
            if (f.getArray()[0] != undefined) {
              f.getArray()[0].oldStyle = f.getArray()[0].getStyle();
              f.getArray()[0].setStyle(style_selected);
            }
            const event = document.createEvent("Event");
            event.initEvent("selectFeature", true, true);
            event.features = th.selectCluster.getFeatures().getArray();
            document.dispatchEvent(event);
          } else {
            e.deselected[0].setStyle(e.deselected[0].oldStyle);
          }
        });
      }

      var vector = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: function (f) {
          return new ol.style.Style({
            image: new ol.style.Circle({
              radius: 5,
              stroke: new ol.style.Stroke({
                width: 1.5,
                color: f.get("color") || [255, 128, 0],
              }),
              fill: new ol.style.Fill({
                color: (f.get("color") || [255, 128, 0]).concat([0.3]),
              }),
            }),
            stroke: new ol.style.Stroke({
              width: 2.5,
              color: f.get("color") || [255, 128, 0],
            }),
            fill: new ol.style.Fill({
              color: (f.get("color") || [255, 128, 0]).concat([0.3]),
            }),
          });
        },
      });
      if (options.editJson != undefined) {
        this.addFeatures(options.editJson, this.vectoredit);
        this.ol2d
          .getView()
          .fit(this.vectoredit.getSource().getExtent(), this.ol2d.getSize());
        this.vectoredit.setExtent([-180, -90, 180, 90]);
      }

      if (options.viewJson != undefined) {
        this.vectorView = new ol.layer.Vector({
          title: "لایه نمایش",
          myLayerType: 1,
          source: new ol.source.Vector(),
        });
        this.vectorView.set("altitudeMode", "clampToGround");
        this.ol2d.addLayer(this.vectorView);
        this.addFeatures(options.viewJson, this.vectorView);
      }

      this.viewJson = options.viewJson;
      if (this.undoInteraction2 != undefined) this.undoInteraction2.clear();
    }

    createMap(map) {
      var th = this;
      const projection = ol.proj.get("EPSG:4326");
      const projectionExtent = projection.getExtent();
      const size = ol.extent.getWidth(projectionExtent) / 256;
      const resolutions = new Array(22);
      const matrixIds = new Array(22);
      for (let z = 1; z < 22; ++z) {
        resolutions[z - 1] = size / Math.pow(2, z);
        matrixIds[z - 1] = "EPSG:4326:" + (z - 1);
      }

      this.bouldersLayerWMTS = new ol.layer.Tile({
        title: "osm",
        myLayerType: 2,
        baseLayer: true,
        visible: true,
        preview: "https://map.etkala.ir/city/10/403/658.png",
        source: new ol.source.XYZ({
          url: "https://map.etkala.ir/city/{z}/{y}/{x}.png",
        }),
      });

      this.bouldersLayerWMTS2 = new ol.layer.Tile({
        preview: "https://map.etkala.ir/city/10/403/658.png",
        myLayerType: 2,
        baseLayer: true,
        visible: false,
        source: new ol.source.XYZ({
          url: "https://map.etkala.ir/city/{z}/{y}/{x}.png",
        }),
      });

      this.ol2d = new ol.Map({
        layers: [this.bouldersLayerWMTS, this.bouldersLayerWMTS2],
        controls: ol.control.defaults({
          zoom: false,
          attribution: true,
          attributionOptions: /** @type {olx.control.AttributionOptions} */ {
            collapsible: false,
          },
        }),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
        target: th.mapOptions.map,
        view: new ol.View({
          extent: projectionExtent,
          projection: ol.proj.get("EPSG:4326"),
          origin: ol.extent.getTopLeft(projectionExtent),
          center: this.center,
          zoom: this.zoom,
        }),
      });
      var markerdiv2 = document.createElement("div");
      markerdiv2.className = "markerdiv2";
      markerdiv2.style.bottom = "auto";
      markerdiv2.style.left = "50%";
      markerdiv2.style.top = "50%";
      markerdiv2.style.transform = "translate(-50%, -50%)";
      document.getElementById(th.mapOptions.map).appendChild(markerdiv2);
      document.getElementsByClassName("markerdiv2")[0].style.visibility =
        "visible";

      this.ol2d.on("pointermove", function (evt) {
        if (th.coordinateSystem == "UTM") {
          th.ol2d.removeControl(th.mouse);
          var zone = Math.floor((evt.coordinate[0] + 180) / 6);
          proj4.defs(
            "EPSG:326" + zone,
            "+proj=utm +zone=" +
              zone +
              " +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
          );
          ol.proj.proj4.register(proj4);

          let xy = ol.proj.transform(
            evt.coordinate,
            "EPSG:4326",
            "EPSG:326" + zone,
          );
          document.getElementsByClassName("mousePosition2")[0].style.width =
            "24em";
          document.getElementsByClassName("mousePosition2")[0].innerHTML =
            "x=" +
            xy[0].toFixed(3) +
            " y=" +
            xy[1].toFixed(3) +
            "     ZONE:" +
            zone;
        } else if (th.coordinateSystem == "WGS84decimaldegree") {
          th.ol2d.removeControl(th.mouse);
          document.getElementsByClassName("mousePosition2")[0].style.width =
            "21em";
          document.getElementsByClassName("mousePosition2")[0].innerHTML =
            "lon: " +
            evt.coordinate[0].toFixed(7) +
            "     " +
            "lat: " +
            evt.coordinate[1].toFixed(6);
        } else if (th.coordinateSystem == "MGRS") {
          var mgrsCoordinate = mgrs.forward(evt.coordinate);
          document.getElementsByClassName("mousePosition2")[0].innerHTML =
            "MGRS: " + mgrsCoordinate;
        } else {
          document.getElementsByClassName("mousePosition2")[0].style.width =
            "16em";
          document.getElementsByClassName("mousePosition2")[0].innerHTML =
            ol.coordinate.toStringHDMS(evt.coordinate);
        }
      });

      var sLayer = new ol.layer.Vector({
        myLayerType: 20,
        source: new ol.source.Vector(),
        style: new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            stroke: new ol.style.Stroke({
              color: "rgb(255,165,0)",
              width: 3,
            }),
            fill: new ol.style.Fill({
              color: "rgba(255,165,0,.3)",
            }),
          }),
          stroke: new ol.style.Stroke({
            color: "rgb(255,165,0)",
            width: 3,
          }),
          fill: new ol.style.Fill({
            color: "rgba(255,165,0,.3)",
          }),
        }),
      });
      this.ol2d.addLayer(sLayer);

      this.ol2d.on("click", function (evt) {
        sLayer.getSource().clear();
      });

      var search = new ol.control.SearchNominatim({
        placeholder: "جستجو",
        url: th.mapOptions.searchServer,
        polygon: true,
        position: true,
      });
      var th = this;
      search.on("select", function (e) {
        if (e.search.geojson) {
          this.clearHistory();
          var format = new ol.format.GeoJSON();
          var f = format.readFeature(e.search.geojson, {
            dataProjection: "EPSG:4326",
            featureProjection: th.ol2d.getView().getProjection(),
          });
          var view = th.ol2d.getView();
          var resolution = view.getResolutionForExtent(
            f.getGeometry().getExtent(),
            th.ol2d.getSize(),
          );
          var zoom = view.getZoomForResolution(resolution);
          var center = ol.extent.getCenter(f.getGeometry().getExtent());
          setTimeout(function () {
            view.animate({
              center: center,
              zoom: Math.min(zoom, 16),
            });
          }, 100);
        } else {
          th.ol2d.getView().animate({
            center: e.coordinate,
            zoom: Math.max(th.ol2d.getView().getZoom(), 16),
          });
        }
      });

      this.ol2d.addControl(search);

      this.mainbar = new ol.control.Bar();
      this.ol2d.addControl(this.mainbar);
      if (!this.editable) this.mainbar.setPosition("right");
      else this.mainbar.setPosition("center-right");

      var layerSwitcherImage = new ol.control.LayerSwitcherImage({
        baseLayer: true,
      });
      this.ol2d.addControl(layerSwitcherImage);

      var search = $("<input>").attr("placeholder", "filter");
      function filterLayers(rex, layers) {
        var found = false;
        layers.forEach(function (l) {
          if (l.getProperties().myLayerType == 1) {
            if (l.getLayers) {
              if (filterLayers(rex, l.getLayers().getArray())) {
                l.set("noLayer", false);
                found = true;
              } else {
                l.set("noLayer", true);
              }
            } else {
              if (rex.test(l.get("title"))) {
                l.setVisible(true);
                found = true;
              } else {
                l.setVisible(false);
              }
            }
          }
        });
        return found;
      }
      var layers = this.ol2d.getLayers().getArray();
      search.on("keyup change", function () {
        var rex = new RegExp(search.val());
        filterLayers(rex, layers);
      });
      var bm = new ol.control.GeoBookmark({
        placeholder: "نشانه گذاری روی نقشه",
        title: "اندازه گیری مساحت",
        marks: {
          "پیش فرض": {
            pos: ol.proj.transform(this.center, "EPSG:4326", "EPSG:4326"),
            zoom: this.zoom,
            permanent: true,
          },
        },
      });

      var acceptCoordinate = document.createElement("div");
      acceptCoordinate.className = "acceptCoordinate";
      document.getElementById(th.mapOptions.map).appendChild(acceptCoordinate);
      var acceptButtom = ol.ext.element.create("BUTTON", {
        type: "button",
        className: "acceptButtom",
        html: "تایید مختصات ",
        parent: acceptCoordinate,
        click: function () {
          var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(
              /** @type {module:ol/style/Icon~Options} */ {
                anchor: [0.5, 1],
                anchorXUnits: "fraction",
                anchorYUnits: "fraction",
                scale: 1,
                src: ip + "/service/icon/edit.png",
              },
            ),
          });
          document.getElementsByClassName(
            "ol-control ol-layerswitcher-image",
          )[0].style.bottom = "50px";
          document.getElementsByClassName(
            "acceptCoordinate",
          )[0].style.visibility = "hidden";
          document.getElementsByClassName("markerdiv2")[0].style.visibility =
            "hidden";
          var ff = new ol.Feature({
            geometry: new ol.geom.Point(th.ol2d.getView().getCenter()),
          });
          ff.setStyle(iconStyle);
          th.vectoredit.getSource().addFeatures([ff]);
        },
      });

      var bottombar = document.createElement("div");
      bottombar.className = "bottombar";
      document.getElementById(th.mapOptions.map).appendChild(bottombar);

      var mousePosition2 = document.createElement("div");
      mousePosition2.className = "mousePosition2";
      bottombar.appendChild(mousePosition2);

      var scaleLineControl = new ol.control.ScaleLine({
        target: bottombar,
      });

      var utm = document.createElement("option");
      utm.value = "UTM";
      utm.id = "UTM";
      utm.innerHTML = "UTM";

      var wgs84decimaldegree = document.createElement("option");
      wgs84decimaldegree.value = "WGS84decimaldegree";
      wgs84decimaldegree.id = "WGS84decimaldegree";
      wgs84decimaldegree.innerHTML = "WGS 84 (decimaldegree)";

      var wgs84DMS = document.createElement("option");
      wgs84DMS.value = "WGS84DMS";
      wgs84DMS.id = "WGS84DMS";
      wgs84DMS.innerHTML = "WGS 84 (DMS)";

      var mgrsSystem = document.createElement("option");
      mgrsSystem.value = "MGRS";
      mgrsSystem.id = "MGRS";
      mgrsSystem.innerHTML = "MGRS";

      let select = document.createElement("select");
      select.className = "select";
      select.appendChild(wgs84DMS);
      select.appendChild(wgs84decimaldegree);
      select.appendChild(utm);
      select.appendChild(mgrsSystem);

      select.onchange = function (e) {
        th.coordinateSystem = e.target.value;
      };
      bottombar.appendChild(select);

      var searchGps = new ol.control.SearchGPS({});
      searchGps.on("select", function (e) {
        th.ol2d.getView().setZoom(6);
        th.ol2d.getView().animate({
          center: e.search.coordinate,
          zoom: Math.max(th.ol2d.getView().getZoom(), 13),
        });
      });
    }

    createTools(map) {
      function featureStyle(f) {
        var sel = f.get("features");
        if (sel) {
          var type = sel[0].get("type");
          var style = styleCache[type];
          if (!style) {
            var color = ol.style.Chart.colors.classic[type];
            style = styleCache[type] = new ol.style.Style({
              image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                anchorXUnits: "fraction",
                anchorYUnits: "fraction",
                scale: 1,
                src: "png/" + form[type] + ".png",
              }),
              stroke: new ol.style.Stroke({
                color: "#fff",
                width: 1,
              }),
            });
          }
          return [style];
        } else
          return [
            new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: "#fff",
                width: 1,
              }),
            }),
          ];
      }
      this.selectCluster = new ol.interaction.SelectCluster({
        condition: ol.events.click,
        style: function (f) {
          return new ol.style.Style({
            image: new ol.style.Circle({
              radius: 5,
              stroke: new ol.style.Stroke({
                width: 1.5,
                color: f.get("color") || [255, 128, 0],
              }),
              fill: new ol.style.Fill({
                color: (f.get("color") || [255, 128, 0]).concat([0.3]),
              }),
            }),
            stroke: new ol.style.Stroke({
              width: 2.5,
              color: f.get("color") || [255, 128, 0],
            }),
            fill: new ol.style.Fill({
              color: (f.get("color") || [255, 128, 0]).concat([0.3]),
            }),
          });
        },
      });
      map.addInteraction(this.selectCluster);
      this.popup = new ol.Overlay.PopupFeature({
        popupClass: "default anim",
        select: this.selectCluster,
        canFix: true,
        template: {
          title: function (f) {
            this.attributes = {};
            for (var i in f.getProperties())
              if (i != "geometry" && i != "style") {
                this.attributes[i] = i;
              }
            return "";
          },
        },
      });
      this.ol2d.addOverlay(this.popup);
      this.popup.on("change:element", function (e) {
        var e = e;
      });

      var th = this;

      var editbar = new ol.control.Bar({
        toggleOne: true,
        group: false,
        className: "ol-editbar",
      });
      this.mainbar.addControl(editbar);

      var sbar = new ol.control.Bar();
      sbar.addControl(
        new ol.control.Button({
          html: '<i class="fa fa-times"></i>',
          title: "Ø­Ø°Ù",
          handleClick: function () {
            var features = selectCtrl.getInteraction().getFeatures();
            if (!features.getLength()) info("Select an object first...");
            else info(features.getLength() + " object(s) deleted.");
            for (var i = 0, f; (f = features.item(i)); i++) {
              th.vectoredit.getSource().removeFeature(f);
              th.popup.hide();
            }
            selectCtrl.getInteraction().getFeatures().clear();
          },
        }),
      );
      var info;
      this.popup2 = new ol.Overlay.Popup({
        popupClass: "default",
        closeBox: true,
        onshow: function () {
          console.log("You opened the box");
        },
        onclose: function () {
          console.log("You close the box");
        },
        positioning: "auto",
        autoPan: true,
        autoPanAnimation: { duration: 250 },
      });
      this.ol2d.addOverlay(this.popup2);

      sbar.addControl(
        new ol.control.Button({
          html: '<i class="fa fa-info"></i>',
          title: "Show informations",
          handleClick: function (e) {
            info = new ol.interaction.Draw({
              type: "Point",
            });
            th.ol2d.addInteraction(info);
            info.on("drawend", function (ee) {
              let coord = ee.feature.getGeometry().getCoordinates();
              var options = {
                url: th.mapOptions.searchServer + "reverse",
                lon: coord[0],
                lat: coord[1],
                format: "geojson",
                "accept-language": "per",
              };

              $.ajax({
                popup: th,
                url: options.url,
                data: {
                  lon: coord[0],
                  lat: coord[1],
                  format: "geojson",
                  "accept-language": "pesr",
                },
              }).done(function (e) {
                this.popup.popup2.show(
                  new ol.format.GeoJSON()
                    .readFeatures(e, {
                      featureProjection: "EPSG:4326",
                    })[0]
                    .getGeometry()
                    .getCoordinates(),
                  th.jsonToString(e.features[0].properties.address),
                );
              });
              th.ol2d.removeInteraction(info);
            });
          },
        }),
      );

      var selectCtrl = new ol.control.Toggle({
        html: '<i class="fa fa-hand-pointer-o "></i>',
        title: "انتخاب",
        interaction: this.selectCluster,
        bar: sbar,
        autoActivate: true,
        active: true,
      });
      selectCtrl.getInteraction().on("select", function (e) {
        if (e.selected.length > 0) {
          var style_selected = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 5,
              stroke: new ol.style.Stroke({
                width: 1.5,
                color: [255, 128, 0],
              }),
              fill: new ol.style.Fill({ color: [255, 128, 0] }),
            }),
            fill: new ol.style.Fill({
              color: "#5fba6a38",
            }),
            stroke: new ol.style.Stroke({
              color: "red",
              width: 3,
              opacity: 1,
            }),
          });
          let f = selectCtrl.getInteraction().getFeatures();
          if (e.deselected.length > 0) {
            e.deselected[0].setStyle(e.deselected[0].oldStyle);
          }
          if (f.getArray()[0] != undefined) {
            f.getArray()[0].oldStyle = f.getArray()[0].getStyle();
            f.getArray()[0].setStyle(style_selected);
            let type = f.getArray()[0].getGeometry().getType();
            if (
              document.getElementsByClassName("color")[0].style.visibility ==
              "visible"
            ) {
              if (type == "Point") {
                document.getElementsByClassName("options")[0].style.visibility =
                  "visible";
                document.getElementsByClassName(
                  "iconSizeli",
                )[0].style.visibility = "visible";
                document.getElementsByClassName(
                  "symbolLableDiv",
                )[0].style.visibility = "visible";
              } else {
                document.getElementsByClassName("options")[0].style.visibility =
                  "hidden";
                document.getElementsByClassName(
                  "iconSizeli",
                )[0].style.visibility = "hidden";
                document.getElementsByClassName(
                  "symbolLableDiv",
                )[0].style.visibility = "hidden";
              }
            }
          }
          if (Object.keys(e.selected[0].getProperties()).length == 1) {
            th.popup.hide();
          } else {
            const event = document.createEvent("Event");
            event.initEvent("selectFeature", true, true);
            event.features = selectCtrl
              .getInteraction()
              .getFeatures()
              .getArray();
            document.dispatchEvent(event);
          }
        } else {
          e.deselected[0].setStyle(e.deselected[0].oldStyle);
        }
      });

      th.ol2d.on("movestart", function (event) {
        document.getElementsByClassName("markerdiv2")[0].style.backgroundSize =
          "27px";
        document.getElementsByClassName(
          "markerdiv2",
        )[0].style.backgroundPosition = "center";
        document.getElementsByClassName(
          "markerdiv2",
        )[0].style.backgroundRepeat = "no-repeat";
        ("no-repeat");
      });

      th.ol2d.on("moveend", function (event) {
        document.getElementsByClassName("markerdiv2")[0].style.backgroundSize =
          "30px";
        document.getElementsByClassName(
          "markerdiv2",
        )[0].style.backgroundRepeat = "no-repeat";
        ("no-repeat");
      });

      var gotoxy2 = new ol.control.Button({
        html: '<i class="fa fa-life-ring" aria-hidden="true"></i>',
        className: "ol-geoloc",
        handleClick: function (proj) {
          var watchID = navigator.geolocation.getCurrentPosition(
            onSuccess,
            onError,
            {},
          );
          function onSuccess(position) {
            document.getElementsByClassName("markerdiv2")[0].style.visibility =
              "visible";
            th.ol2d
              .getView()
              .setCenter([position.coords.longitude, position.coords.latitude]);
            th.ol2d.getView().setZoom(18);
            document.getElementsByClassName(
              "acceptCoordinate",
            )[0].style.visibility = "visible";
            document.getElementsByClassName(
              "ol-control ol-layerswitcher-image",
            )[0].style.bottom = "70px";
          }

          function onError(error) {
            alert(
              "code: " + error.code + "\n" + "message: " + error.message + "\n",
            );
          }
        },
      });

      editbar.addControl(gotoxy2);
    }

    setMyMapCenter(position, zoom) {
      this.ol2d.getView().setCenter(position);
      this.ol2d.getView().setZoom(zoom);
    }

    getGeolocation() {
      var th = this;
      let coord = this.ol2d.getView().getCenter();
      var options = {
        url: th.mapOptions.searchServer + "reverse",
        lon: coord[0],
        lat: coord[1],
        format: "geojson",
        "accept-language": "per",
      };
      let address = "";
      $.ajax({
        url: options.url,
        data: {
          lon: coord[0],
          lat: coord[1],
          format: "geojson",
          "accept-language": "pesr",
        },
        async: false,
      }).done(function (e) {
        address = e.features[0].properties.address;
      });

      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(
          /** @type {module:ol/style/Icon~Options} */ {
            anchor: [0.5, 1],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            scale: 1,
            src: ip + "/service/icon/edit.png",
          },
        ),
      });

      var ff = new ol.Feature({
        geometry: new ol.geom.Point(th.ol2d.getView().getCenter()),
      });
      ff.setStyle(iconStyle);
      this.vectoredit.getSource().clear();
      this.vectoredit.getSource().addFeatures([ff]);
      this.mylocation = coord;
      return { coordinate: coord, adress: address };
    }

    getGeoJson() {
      var geojson = [];
      let features = this.vectoredit.getSource().getFeatures();
      for (var i = 0; i < features.length; i++) {
        let json = new ol.format.GeoJSON().writeFeature(
          this.vectoredit.getSource().getFeatures()[i],
        );
        geojson.push({ geom: json });
      }
      return geojson;
    }

    addGeoJson(json) {
      var features = new ol.format.GeoJSON().readFeatures(json, {
        featureProjection: "EPSG:4326",
      });
      this.vectoredit.getSource().addFeatures(features);
    }

    jsonToString(json) {
      var keys = Object.keys(json);
      var str = "";
      for (var i in keys) {
        str += keys[i] + " : " + json[keys[i]] + "<br/>";
      }
      return str;
    }

    addGeoJsonWithStyle(json) {
      var features = new ol.format.GeoJSON().readFeatures(json, {
        featureProjection: "EPSG:4326",
      });
      for (var i = 0; i < features.length; i++) {
        if (features[i].getProperties().style != undefined) {
          if (features[i].getProperties().style.icon != undefined) {
            var style = new ol.style.Style({
              image: new ol.style.FontSymbol({
                form: "none",
                gradient: false,
                glyph: features[i].getProperties().style.icon,
                text: "",
                font: "sans-serif",
                fontSize: features[i].getProperties().style.iconSize,
                fontStyle: "",
                radius: 15,
                rotation: 0,
                rotateWithView: false,
                offsetY: 0,
                color: $("#bt").val(),
                fill: new ol.style.Fill({
                  color: features[i].getProperties().style.fill,
                }),
                stroke: new ol.style.Stroke({
                  color: features[i].getProperties().style.stroke,
                  width: 3,
                }),
              }),
              text: new ol.style.TextPath({
                text: features[i].get("name"),
                font: "15px Arial",
                fill: new ol.style.Fill({ color: "#369" }),
                stroke: new ol.style.Stroke({
                  color: "#fff",
                  width: 3,
                }),
                textBaseline: "middle",
                textAlign: "center",
                rotateWithView: true,
                textOverflow: "hidden",
                minWidth: 0,
              }),
            });
            features[i].setStyle(style);
          } else if (features[i].getProperties().style.imageIcon != undefined) {
            var style = new ol.style.Style({
              image: new ol.style.Icon(
                /** @type {module:ol/style/Icon~Options} */ {
                  anchor: [20, 32],
                  anchorXUnits: "pixels",
                  anchorYUnits: "pixels",
                  scale: 1,
                  src: features[i].getProperties().style.imageIcon,
                },
              ),
              text: new ol.style.TextPath({
                text: features[i].getProperties().style.label,
                font: "15px Arial",
                fill: new ol.style.Fill({ color: "#369" }),
                stroke: new ol.style.Stroke({
                  color: "#fff",
                  width: 3,
                }),
                textBaseline: "middle",
                textAlign: "center",
                rotateWithView: true,
                textOverflow: "hidden",
                minWidth: 0,
              }),
            });
            feature.setStyle(style);
          } else if (
            features[i].getProperties().style.fill != undefined ||
            features[i].getProperties().style.stroke != undefined
          ) {
            var style = new ol.style.Style({
              fill: new ol.style.Fill({
                color:
                  features[i].getProperties().style.fill ||
                  "rgba(255,165,0,.3)",
              }),
              stroke: new ol.style.Stroke({
                color:
                  features[i].getProperties().style.stroke || "rgb(255,165,0)",
                width: 3,
              }),
              text: new ol.style.TextPath({
                text: features[i].get("name"),
                font: "15px Arial",
                fill: new ol.style.Fill({ color: "#369" }),
                stroke: new ol.style.Stroke({
                  color: "#fff",
                  width: 3,
                }),
                textBaseline: "middle",
                textAlign: "center",
                rotateWithView: true,
                textOverflow: "hidden",
                minWidth: 0,
              }),
            });
            features[i].setStyle(style);
          }
        } else {
          var style = new ol.style.Style({
            image: new ol.style.Icon(
              /** @type {module:ol/style/Icon~Options} */ {
                anchor: [20, 32],
                anchorXUnits: "pixels",
                anchorYUnits: "pixels",
                scale: 1,
                src: ip + "/service/icon/store.png",
              },
            ),
            stroke: new ol.style.Stroke({
              color: "rgb(255,165,0)",
              width: 3,
            }),
            fill: new ol.style.Fill({
              color: "rgba(255,165,0,.3)",
            }),
          });
          features[i].setStyle(style);
        }
      }

      this.vectoredit.getSource().addFeatures(features);
      this.undoInteraction2.clear();
    }

    addLayerGeoJson(json, name) {
      const layer = new ol.layer.Vector({
        title: name,
        myLayerType: 1,
        style: new ol.style.Style({
          image: new ol.style.Icon(
            /** @type {module:ol/style/Icon~Options} */ {
              anchor: [0.5, 0.5],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
              scale: 1,
              src: ip + "/service/icon/edit.png",
            },
          ),
          stroke: new ol.style.Stroke({
            color: "rgb(0,0,160)",
            width: 2,
          }),
          fill: new ol.style.Fill({
            color: "rgba(0,0,160,.3)",
          }),
        }),
        source: new ol.source.Vector(),
      });
      this.ol2d.addLayer(layer);
      this.addFeatures(json, layer);
    }

    addFeatures(features, layer) {
      for (let i = 0; i < features.length; i++) {
        const feature = new ol.format.GeoJSON().readFeature(features[i].geom, {
          featureProjection: "EPSG:4326",
        });
        if (
          features[i].properties != undefined &&
          layer.getProperties().title != "لایه ویرایش"
        ) {
          feature.setProperties(features[i].properties);
        }
        if (feature.getProperties().style != undefined) {
          if (feature.getProperties().style.icon != undefined) {
            var style = new ol.style.Style({
              image: new ol.style.FontSymbol({
                form: "none",
                gradient: false,
                glyph: feature.getProperties().style.icon,
                text: "",
                font: "sans-serif",
                fontSize: feature.getProperties().style.iconSize,
                fontStyle: "",
                radius: 15,
                rotation: 0,
                rotateWithView: false,
                offsetY: 0,
                color: $("#bt").val(),
                fill: new ol.style.Fill({
                  color: feature.getProperties().style.fill,
                }),
                stroke: new ol.style.Stroke({
                  color: feature.getProperties().style.stroke,
                  width: 3,
                }),
              }),
              text: new ol.style.TextPath({
                text: feature.get("نام"),
                font: "15px Arial",
                fill: new ol.style.Fill({ color: "#369" }),
                stroke: new ol.style.Stroke({
                  color: "#fff",
                  width: 3,
                }),
                textBaseline: "middle",
                textAlign: "end",
                rotateWithView: true,
                textOverflow: "hidden",
                minWidth: 0,
                offsetX: 15,
              }),
            });
            feature.setStyle(style);
          } else if (feature.getProperties().style.imageIcon != undefined) {
            var style = new ol.style.Style({
              image: new ol.style.Icon(
                /** @type {module:ol/style/Icon~Options} */ {
                  anchor: [16, 32],
                  anchorXUnits: "pixels",
                  anchorYUnits: "pixels",
                  scale: 1,
                  src: feature.getProperties().style.imageIcon,
                },
              ),
              text: new ol.style.Text({
                text: feature.getProperties().style.label,
                font: feature.getProperties().style.labelFontSize + "px Arial",
                fill: new ol.style.Fill({
                  color: feature.getProperties().style.labelFillColor,
                }),
                textBaseline: "middle",
                textAlign: "middle",
                rotateWithView: true,
                textOverflow: "hidden",
                offsetX: 10,
                offsetY: 10,
              }),
            });
            feature.setStyle(style);
          } else if (
            feature.getProperties().style.fill != undefined ||
            feature.getProperties().style.stroke != undefined
          ) {
            var style = new ol.style.Style({
              fill: new ol.style.Fill({
                color:
                  feature.getProperties().style.fill || "rgba(255,165,0,.3)",
              }),
              stroke: new ol.style.Stroke({
                color: feature.getProperties().style.stroke || "rgb(255,165,0)",
                width: 3,
              }),
              text: new ol.style.TextPath({
                text: feature.get("name"),
                font: "15px Arial",
                fill: new ol.style.Fill({ color: "#369" }),
                stroke: new ol.style.Stroke({
                  color: "#fff",
                  width: 3,
                }),
                textBaseline: "middle",
                textAlign: "center",
                rotateWithView: true,
                textOverflow: "hidden",
                minWidth: 0,
              }),
            });
            feature.setStyle(style);
          }
        } else {
          var style = new ol.style.Style({
            image: new ol.style.Icon(
              /** @type {module:ol/style/Icon~Options} */ {
                anchor: [20, 32],
                anchorXUnits: "pixels",
                anchorYUnits: "pixels",
                scale: 1,
                src: ip + "/service/icon/store.png",
              },
            ),
            stroke: new ol.style.Stroke({
              color: "rgb(255,165,0)",
              width: 3,
            }),
            fill: new ol.style.Fill({
              color: "rgba(255,165,0,.3)",
            }),
          });
          feature.setStyle(style);
        }
        layer.getSource().addFeature(feature);
      }
    }

    getNearestPoint() {
      let targetPoint = turf.point(this.mylocation, {
        "marker-color": "#0F0",
      });
      let features = this.vectorView.getSource().getFeatures();
      let storePoint = [];
      features.forEach(feature =>
        storePoint.push(
          turf.point(
            feature.getGeometry().getCoordinates(),
            feature.getProperties(),
          ),
        ),
      );
      let points = turf.featureCollection(storePoint);

      let nearest = turf.nearestPoint(targetPoint, points);
      let dist = this.calculateDistance(
        this.mylocation,
        nearest.geometry.coordinates,
      );
      let distLable = "";
      if (dist < 1) distLable = (dist * 1000).toFixed(0) + "m";
      else distLable = dist.toFixed(1) + "km";
      nearest.properties.distanceToPoint = dist;
      let curv = this.createCurveLine(
        this.mylocation,
        nearest.geometry.coordinates,
      );
      let line = turf.lineString(curv);
      let bbox = turf.bbox(line);

      var ff = new ol.Feature({
        geometry: new ol.geom.LineString(curv),
      });
      var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "#17C6F5",
          width: 3,
        }),
        text: new ol.style.TextPath({
          text: distLable,
          font: "15px Arial",
          fill: new ol.style.Fill({ color: "#369" }),
          stroke: new ol.style.Stroke({
            color: "#fff",
            width: 3,
          }),
          textBaseline: "middle",
          textAlign: "center",
          rotateWithView: true,
          textOverflow: "hidden",
          minWidth: 0,
        }),
      });

      ff.setStyle(style);
      this.vectoredit.getSource().addFeatures([ff]);
      this.ol2d.getView().fit(bbox, {
        constrainResolution: false,
        padding: [100, 100, 100, 100],
      });

      return nearest;
    }

    createCurveLine(_start, _end) {
      const radius = turf.rhumbDistance(_start, _end);
      const midpoint = turf.midpoint(_start, _end);
      const bearing = turf.rhumbBearing(_start, _end) - 89;
      const origin = turf.rhumbDestination(midpoint, radius, bearing);

      const curvedLine = turf.lineArc(
        origin,
        turf.distance(origin, _start),
        turf.bearing(origin, _end),
        turf.bearing(origin, _start),
        { steps: 128 },
      );

      return curvedLine.geometry.coordinates;
    }

    clearMap(startPoint, endPoint) {
      this.vectoredit.getSource().clear();
    }

    viewLayerVisible(input) {
      this.vectorView.setVisible(input);
    }

    calculateDistance(startPoint, endPoint) {
      let from = turf.point(startPoint);
      let to = turf.point(endPoint);
      let options = { units: "kilometers" };

      let distance = turf.distance(from, to, options);

      return distance;
    }

    static getNearestPointOutOfMap(mylocation, points) {
      let targetPoint = turf.point(mylocation, {
        "marker-color": "#0F0",
      });
      let storePoint = [];
      points.forEach(point =>
        storePoint.push(turf.point(point.coordinate, point.properties)),
      );
      let storePoints = turf.featureCollection(storePoint);
      let nearest = turf.nearestPoint(targetPoint, storePoints);

      let from = turf.point(mylocation);
      let to = turf.point(nearest.geometry.coordinates);
      let options = { units: "kilometers" };

      let dist = turf.distance(from, to, options);
      let distLable = "";
      if (dist < 1) distLable = (dist * 1000).toFixed(0) + "m";
      else distLable = dist.toFixed(3) + "km";
      nearest.properties.distanceToPoint = dist;
      nearest.properties.distanceToPointLable = distLable;
      return nearest;
    }
  }
})();
