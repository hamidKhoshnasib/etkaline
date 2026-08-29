# Etkaline API Reference

> Generated from the complete aggregated OpenAPI document exposed by the Etkaline test API.

- **Source:** [https://test12.etkala.ir/swagger/All/v1/swagger.json](https://test12.etkala.ir/swagger/All/v1/swagger.json)
- **Swagger UI:** [https://test12.etkala.ir/swagger](https://test12.etkala.ir/swagger)
- **OpenAPI version:** 3.0.4
- **API title:** همه
- **API version:** v1
- **Generated:** 2026-08-27 13:53:52 +03:30
- **Coverage:** 101 operations across 92 paths, 30 tags, and 207 component schemas

This file is generated from the server contract. When behavior and this document disagree, verify the current OpenAPI source and backend implementation before changing client code. The test host must not be used as a production canonical URL.

## Module documents

| Module         | Description                      | OpenAPI document                                                                                                               |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `All`          | All modules                      | [https://test12.etkala.ir/swagger/All/v1/swagger.json](https://test12.etkala.ir/swagger/All/v1/swagger.json)                   |
| `Auth`         | Authentication                   | [https://test12.etkala.ir/swagger/Auth/v1/swagger.json](https://test12.etkala.ir/swagger/Auth/v1/swagger.json)                 |
| `Catalog`      | Catalog                          | [https://test12.etkala.ir/swagger/Catalog/v1/swagger.json](https://test12.etkala.ir/swagger/Catalog/v1/swagger.json)           |
| `Cms`          | Content management               | [https://test12.etkala.ir/swagger/Cms/v1/swagger.json](https://test12.etkala.ir/swagger/Cms/v1/swagger.json)                   |
| `Crm`          | Customer relationship management | [https://test12.etkala.ir/swagger/Crm/v1/swagger.json](https://test12.etkala.ir/swagger/Crm/v1/swagger.json)                   |
| `Encryption`   | Encryption                       | [https://test12.etkala.ir/swagger/Encryption/v1/swagger.json](https://test12.etkala.ir/swagger/Encryption/v1/swagger.json)     |
| `File`         | File management                  | [https://test12.etkala.ir/swagger/File/v1/swagger.json](https://test12.etkala.ir/swagger/File/v1/swagger.json)                 |
| `Financial`    | Financial                        | [https://test12.etkala.ir/swagger/Financial/v1/swagger.json](https://test12.etkala.ir/swagger/Financial/v1/swagger.json)       |
| `Logistic`     | Logistics                        | [https://test12.etkala.ir/swagger/Logistic/v1/swagger.json](https://test12.etkala.ir/swagger/Logistic/v1/swagger.json)         |
| `Log`          | Logging                          | [https://test12.etkala.ir/swagger/Log/v1/swagger.json](https://test12.etkala.ir/swagger/Log/v1/swagger.json)                   |
| `Notification` | Notifications                    | [https://test12.etkala.ir/swagger/Notification/v1/swagger.json](https://test12.etkala.ir/swagger/Notification/v1/swagger.json) |
| `Ordering`     | Ordering                         | [https://test12.etkala.ir/swagger/Ordering/v1/swagger.json](https://test12.etkala.ir/swagger/Ordering/v1/swagger.json)         |
| `Survey`       | Survey                           | [https://test12.etkala.ir/swagger/Survey/v1/swagger.json](https://test12.etkala.ir/swagger/Survey/v1/swagger.json)             |

## Authentication and global request context

| Scheme     | Type   | Location | Name / Scheme | Description                                       |
| ---------- | ------ | -------- | ------------- | ------------------------------------------------- |
| `bearer`   | http   |          | bearer        | JWT Authorization header using the Bearer scheme. |
| `SiteType` | apiKey | header   | site-type     | site-type: supermarket or appliance               |

**Global security:** bearer or SiteType

## Endpoint index

### - آدرس ها

| Method     | Path                                                                         | Summary                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **GET**    | [`/api/Addresses`](#operation-get--api-addresses)                            | —                                                                                                                                          |
| **POST**   | [`/api/Addresses`](#operation-post--api-addresses)                           | افزودن آدرس جدید.<br>در صورتی که آدرس پیش فرض باشد اطلاعات عضو و توکن جدید در خروجی می آید.<br>در غیر این صورت مقدار Value برابر null است. |
| **PUT**    | [`/api/Addresses`](#operation-put--api-addresses)                            | ویرایش آدرس.<br>در صورتی که آدرس پیش فرض باشد اطلاعات عضو و توکن جدید در خروجی می آید.<br>در غیر این صورت مقدار Value برابر null است.      |
| **DELETE** | [`/api/Addresses/{id}`](#operation-delete--api-addresses--id-)               | —                                                                                                                                          |
| **GET**    | [`/api/Addresses/{id}`](#operation-get--api-addresses--id-)                  | —                                                                                                                                          |
| **GET**    | [`/api/Addresses/GetDefault`](#operation-get--api-addresses-getdefault)      | —                                                                                                                                          |
| **POST**   | [`/api/Addresses/SetAsDefault`](#operation-post--api-addresses-setasdefault) | —                                                                                                                                          |

### - احراز هویت مشتری

| Method   | Path                                                                       | Summary |
| -------- | -------------------------------------------------------------------------- | ------- |
| **POST** | [`/api/Auth/CheckAccessToken`](#operation-post--api-auth-checkaccesstoken) | —       |
| **GET**  | [`/api/Auth/GetCaptcha`](#operation-get--api-auth-getcaptcha)              | —       |
| **POST** | [`/api/Auth/Login`](#operation-post--api-auth-login)                       | —       |
| **POST** | [`/api/Auth/RefreshToken`](#operation-post--api-auth-refreshtoken)         | —       |
| **POST** | [`/api/Auth/ResendCode`](#operation-post--api-auth-resendcode)             | —       |
| **POST** | [`/api/Auth/VerifyCode`](#operation-post--api-auth-verifycode)             | —       |

### - استان ها

| Method  | Path                                              | Summary |
| ------- | ------------------------------------------------- | ------- |
| **GET** | [`/api/Provinces`](#operation-get--api-provinces) | —       |

### - اسلاید ها

| Method  | Path                                        | Summary |
| ------- | ------------------------------------------- | ------- |
| **GET** | [`/api/Slides`](#operation-get--api-slides) | —       |

### - برندها

| Method  | Path                                                                    | Summary |
| ------- | ----------------------------------------------------------------------- | ------- |
| **GET** | [`/api/Brands/GetHomeBrands`](#operation-get--api-brands-gethomebrands) | —       |
| **GET** | [`/api/Brands/Search`](#operation-get--api-brands-search)               | —       |

### - بنرها

| Method  | Path                                                                                                          | Summary                                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET** | [`/api/Banners/GetBannersByLayoutId/{LayoutId}`](#operation-get--api-banners-getbannersbylayoutid--layoutid-) | —                                                                                                                                            |
| **GET** | [`/api/Banners/GetBlogBanners`](#operation-get--api-banners-getblogbanners)                                   | —                                                                                                                                            |
| **GET** | [`/api/Banners/GetByType`](#operation-get--api-banners-getbytype)                                             | گرفتن بنر بر اساس نوع بنر<br>0 => سایر \|<br>1 => بنر های کنار اسلاید \|<br>2 => بنر های بلاگ \|<br>3 => بنر های دسته بندی<br>4 => بنر لاگین |
| **GET** | [`/api/Banners/GetCategoryBanners`](#operation-get--api-banners-getcategorybanners)                           | —                                                                                                                                            |
| **GET** | [`/api/Banners/GetLoginBanners`](#operation-get--api-banners-getloginbanners)                                 | —                                                                                                                                            |
| **GET** | [`/api/Banners/GetSlideSideBanners`](#operation-get--api-banners-getslidesidebanners)                         | —                                                                                                                                            |

### - پرسش های متداول

| Method  | Path                                  | Summary |
| ------- | ------------------------------------- | ------- |
| **GET** | [`/api/Faq`](#operation-get--api-faq) | —       |

### - پروفایل کاربر

| Method  | Path                                                                    | Summary |
| ------- | ----------------------------------------------------------------------- | ------- |
| **GET** | [`/api/Profile`](#operation-get--api-profile)                           | —       |
| **PUT** | [`/api/Profile`](#operation-put--api-profile)                           | —       |
| **GET** | [`/api/Profile/GetLastLogin`](#operation-get--api-profile-getlastlogin) | —       |
| **GET** | [`/api/Profile/GetLoginLogs`](#operation-get--api-profile-getloginlogs) | —       |

### - پست ها

| Method  | Path                                                            | Summary |
| ------- | --------------------------------------------------------------- | ------- |
| **GET** | [`/api/Posts/GetDetails`](#operation-get--api-posts-getdetails) | —       |
| **GET** | [`/api/Posts/Search`](#operation-get--api-posts-search)         | —       |

### - تبلیغات بالای صفحه

| Method  | Path                                                        | Summary |
| ------- | ----------------------------------------------------------- | ------- |
| **GET** | [`/api/Advertisements`](#operation-get--api-advertisements) | —       |

### - تبلیغات پاپ آپ

| Method  | Path                                                | Summary |
| ------- | --------------------------------------------------- | ------- |
| **GET** | [`/api/Promotions`](#operation-get--api-promotions) | —       |

### - تماس با ما

| Method   | Path                                               | Summary |
| -------- | -------------------------------------------------- | ------- |
| **GET**  | [`/api/ContactUs`](#operation-get--api-contactus)  | —       |
| **POST** | [`/api/ContactUs`](#operation-post--api-contactus) | —       |

### - دسته بندی بلاگ

| Method  | Path                                                                  | Summary |
| ------- | --------------------------------------------------------------------- | ------- |
| **GET** | [`/api/BlogCategories`](#operation-get--api-blogcategories)           | —       |
| **GET** | [`/api/BlogCategories/{id}`](#operation-get--api-blogcategories--id-) | —       |

### - دسته بندی محصولات

| Method  | Path                                                                                                    | Summary                               |
| ------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **GET** | [`/api/Categories`](#operation-get--api-categories)                                                     | —                                     |
| **GET** | [`/api/Categories/{id}`](#operation-get--api-categories--id-)                                           | —                                     |
| **GET** | [`/api/Categories/SearchableProperties/{id}`](#operation-get--api-categories-searchableproperties--id-) | پروپرتی های دسته بندی برای صفحه جستجو |

### - شبکه های اجتماعی

| Method  | Path                                                        | Summary |
| ------- | ----------------------------------------------------------- | ------- |
| **GET** | [`/api/SocialNetworks`](#operation-get--api-socialnetworks) | —       |

### - شهرها

| Method  | Path                                                      | Summary |
| ------- | --------------------------------------------------------- | ------- |
| **GET** | [`/api/Cities`](#operation-get--api-cities)               | —       |
| **GET** | [`/api/Cities/Search`](#operation-get--api-cities-search) | —       |

### - صفحه اصلی

| Method  | Path                                                                              | Summary |
| ------- | --------------------------------------------------------------------------------- | ------- |
| **GET** | [`/api/Home/GetFooterDescription`](#operation-get--api-home-getfooterdescription) | —       |
| **GET** | [`/api/Home/GetLayout`](#operation-get--api-home-getlayout)                       | —       |
| **GET** | [`/api/Home/GetMetaTags`](#operation-get--api-home-getmetatags)                   | —       |

### - علاقه مندی ها

| Method     | Path                                                                             | Summary |
| ---------- | -------------------------------------------------------------------------------- | ------- |
| **DELETE** | [`/api/Favorites`](#operation-delete--api-favorites)                             | —       |
| **GET**    | [`/api/Favorites`](#operation-get--api-favorites)                                | —       |
| **POST**   | [`/api/Favorites`](#operation-post--api-favorites)                               | —       |
| **POST**   | [`/api/Favorites/GetFavoriteIds`](#operation-post--api-favorites-getfavoriteids) | —       |

### - فاکتور ها

| Method  | Path                                                    | Summary |
| ------- | ------------------------------------------------------- | ------- |
| **GET** | [`/api/Factors`](#operation-get--api-factors)           | —       |
| **GET** | [`/api/Factors/{id}`](#operation-get--api-factors--id-) | —       |

### - محصولات

| Method   | Path                                                                                                | Summary                                                    |
| -------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **GET**  | [`/api/Products/{id}`](#operation-get--api-products--id-)                                           | جزییات یک محصول                                            |
| **GET**  | [`/api/Products/GetEffectiveProperty/{id}`](#operation-get--api-products-geteffectiveproperty--id-) | گرفتن مشخصه تاثیر گذار روی قیمت محصول به همراه لیست آیتمها |
| **GET**  | [`/api/Products/GetProdutsByLayoutId`](#operation-get--api-products-getprodutsbylayoutid)           | گرفتن محصولات یک لیوت مشخص                                 |
| **POST** | [`/api/Products/Search`](#operation-post--api-products-search)                                      | جستجو محصولات بر اساس دسته بندی، تگ، برند و ...            |
| **GET**  | [`/api/Products/Searchbar`](#operation-get--api-products-searchbar)                                 | جستجو محصولات در سرچ بار بالای سایت                        |

### اعلانات

| Method  | Path                                        | Summary |
| ------- | ------------------------------------------- | ------- |
| **GET** | [`/api/Notice`](#operation-get--api-notice) | —       |

### پرداخت ها

| Method  | Path                                                                            | Summary |
| ------- | ------------------------------------------------------------------------------- | ------- |
| **GET** | [`/api/Payments`](#operation-get--api-payments)                                 | —       |
| **GET** | [`/api/Payments/GetDetails/{id}`](#operation-get--api-payments-getdetails--id-) | —       |

### تیکت ها

| Method   | Path                                                                                      | Summary |
| -------- | ----------------------------------------------------------------------------------------- | ------- |
| **GET**  | [`/api/Tickets`](#operation-get--api-tickets)                                             | —       |
| **POST** | [`/api/Tickets`](#operation-post--api-tickets)                                            | —       |
| **GET**  | [`/api/Tickets/{id}`](#operation-get--api-tickets--id-)                                   | —       |
| **GET**  | [`/api/Tickets/GetUnseenMessageCount`](#operation-get--api-tickets-getunseenmessagecount) | —       |
| **POST** | [`/api/Tickets/SeenMessages/{id}`](#operation-post--api-tickets-seenmessages--id-)        | —       |
| **POST** | [`/api/Tickets/SendMessage`](#operation-post--api-tickets-sendmessage)                    | —       |

### زمانبندی ارسال

| Method   | Path                                                                                                              | Summary |
| -------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| **GET**  | [`/api/DeliveryTimes/GetApplianceDeliveryTimes`](#operation-get--api-deliverytimes-getappliancedeliverytimes)     | —       |
| **GET**  | [`/api/DeliveryTimes/GetSuperMarketDeliveryTimes`](#operation-get--api-deliverytimes-getsupermarketdeliverytimes) | —       |
| **POST** | [`/api/DeliveryTimes/SetApplianceDeliveryTime`](#operation-post--api-deliverytimes-setappliancedeliverytime)      | —       |
| **POST** | [`/api/DeliveryTimes/SetSuperMarketDeliveryTime`](#operation-post--api-deliverytimes-setsupermarketdeliverytime)  | —       |

### سبد خرید

| Method   | Path                                                                                                                 | Summary                                                    |
| -------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **POST** | [`/api/Baskets/AddToBasket`](#operation-post--api-baskets-addtobasket)                                               | —                                                          |
| **GET**  | [`/api/Baskets/CanUseDiscount/{basketId}`](#operation-get--api-baskets-canusediscount--basketid-)                    | —                                                          |
| **POST** | [`/api/Baskets/CheckDiscount`](#operation-post--api-baskets-checkdiscount)                                           | —                                                          |
| **POST** | [`/api/Baskets/CheckStoreMinOrderPrice/{basketId}`](#operation-post--api-baskets-checkstoreminorderprice--basketid-) | —                                                          |
| **POST** | [`/api/Baskets/DeleteDiscount/{basketId}`](#operation-post--api-baskets-deletediscount--basketid-)                   | —                                                          |
| **POST** | [`/api/Baskets/DeleteItem`](#operation-post--api-baskets-deleteitem)                                                 | —                                                          |
| **GET**  | [`/api/Baskets/GetCheckoutDetails`](#operation-get--api-baskets-getcheckoutdetails)                                  | گرفتن اطلاعات سبد خرید پیش از پرداخت                       |
| **GET**  | [`/api/Baskets/GetOpenBasket`](#operation-get--api-baskets-getopenbasket)                                            | —                                                          |
| **GET**  | [`/api/Baskets/GetPaygates`](#operation-get--api-baskets-getpaygates)                                                | لیست درگاه های پرداخت.<br>وقتی روش پرداخت درگاه بانکی باشد |
| **GET**  | [`/api/Baskets/GetPayTypes/{basketId}`](#operation-get--api-baskets-getpaytypes--basketid-)                          | لیست روش های پرداخت                                        |
| **GET**  | [`/api/Baskets/GetServiceCost/{basketId}`](#operation-get--api-baskets-getservicecost--basketid-)                    | —                                                          |
| **GET**  | [`/api/Baskets/GetShippingCost/{basketId}`](#operation-get--api-baskets-getshippingcost--basketid-)                  | —                                                          |
| **GET**  | [`/api/Baskets/GetStoreMinOrderPrice/{basketId}`](#operation-get--api-baskets-getstoreminorderprice--basketid-)      | گرفتن کف مبلغ سفارش در فروشگاه                             |
| **GET**  | [`/api/Baskets/HasDiscount/{basketId}`](#operation-get--api-baskets-hasdiscount--basketid-)                          | —                                                          |
| **POST** | [`/api/Baskets/PayBasket`](#operation-post--api-baskets-paybasket)                                                   | بروزرسانی نهایی سفارش و پرداخت                             |
| **POST** | [`/api/Baskets/SaveBasket`](#operation-post--api-baskets-savebasket)                                                 | ذخیره اطلاعات سبد خرید و گرفتن هزینه های سبد خرید          |
| **POST** | [`/api/Baskets/UpdateQuantity`](#operation-post--api-baskets-updatequantity)                                         | —                                                          |

### صفحات جانبی

| Method  | Path                                                                    | Summary |
| ------- | ----------------------------------------------------------------------- | ------- |
| **GET** | [`/api/ExtraPages`](#operation-get--api-extrapages)                     | —       |
| **GET** | [`/api/ExtraPages/{id}`](#operation-get--api-extrapages--id-)           | —       |
| **GET** | [`/api/ExtraPages/AboutUs`](#operation-get--api-extrapages-aboutus)     | —       |
| **GET** | [`/api/ExtraPages/Agreement`](#operation-get--api-extrapages-agreement) | —       |

### فروشگاه ها

| Method   | Path                                                              | Summary |
| -------- | ----------------------------------------------------------------- | ------- |
| **GET**  | [`/api/Stores/{StoreId}`](#operation-get--api-stores--storeid-)   | —       |
| **POST** | [`/api/Stores/GetAll`](#operation-post--api-stores-getall)        | —       |
| **GET**  | [`/api/Stores/GetDefault`](#operation-get--api-stores-getdefault) | —       |

### کامنت ها

| Method   | Path                                                                             | Summary |
| -------- | -------------------------------------------------------------------------------- | ------- |
| **GET**  | [`/api/Comments`](#operation-get--api-comments)                                  | —       |
| **POST** | [`/api/Comments/AddLike/{id}`](#operation-post--api-comments-addlike--id-)       | —       |
| **POST** | [`/api/Comments/Create`](#operation-post--api-comments-create)                   | —       |
| **POST** | [`/api/Comments/RemoveLike/{id}`](#operation-post--api-comments-removelike--id-) | —       |

### نظرسنجی

| Method   | Path                                           | Summary |
| -------- | ---------------------------------------------- | ------- |
| **GET**  | [`/api/Surveys`](#operation-get--api-surveys)  | —       |
| **POST** | [`/api/Surveys`](#operation-post--api-surveys) | —       |

### ورژن اپلیکیشن

| Method  | Path                                                                          | Summary |
| ------- | ----------------------------------------------------------------------------- | ------- |
| **GET** | [`/api/AppVersions`](#operation-get--api-appversions)                         | —       |
| **GET** | [`/api/AppVersions/CheckUpdate`](#operation-get--api-appversions-checkupdate) | —       |

## Operations

<a id="operation-get--api-addresses"></a>

### GET /api/Addresses

- **Tags:** - آدرس ها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[AuthModule.Application.AddressCQRS.AddressGetCustomerListQuery]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-authmodule-application-addresscqrs-addressgetcustomerlistquery--) | —       |

<a id="operation-post--api-addresses"></a>

### POST /api/Addresses

- **Tags:** - آدرس ها
- **Summary:** افزودن آدرس جدید.<br>در صورتی که آدرس پیش فرض باشد اطلاعات عضو و توکن جدید در خروجی می آید.<br>در غیر این صورت مقدار Value برابر null است.
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                     | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [AuthModule.Application.AddressCQRS.AddressCreateCommand](#schema-authmodule-application-addresscqrs-addresscreatecommand) | —       |
| `text/json`          | [AuthModule.Application.AddressCQRS.AddressCreateCommand](#schema-authmodule-application-addresscqrs-addresscreatecommand) | —       |
| `application/*+json` | [AuthModule.Application.AddressCQRS.AddressCreateCommand](#schema-authmodule-application-addresscqrs-addresscreatecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                        | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.Contracts.SetDefaultStoreDTO]](#schema-abstractions-application-dtos-baseresult-1-authmodule-application-contracts-setdefaultstoredto-) | —       |

<a id="operation-put--api-addresses"></a>

### PUT /api/Addresses

- **Tags:** - آدرس ها
- **Summary:** ویرایش آدرس.<br>در صورتی که آدرس پیش فرض باشد اطلاعات عضو و توکن جدید در خروجی می آید.<br>در غیر این صورت مقدار Value برابر null است.
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                     | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [AuthModule.Application.AddressCQRS.AddressUpdateCommand](#schema-authmodule-application-addresscqrs-addressupdatecommand) | —       |
| `text/json`          | [AuthModule.Application.AddressCQRS.AddressUpdateCommand](#schema-authmodule-application-addresscqrs-addressupdatecommand) | —       |
| `application/*+json` | [AuthModule.Application.AddressCQRS.AddressUpdateCommand](#schema-authmodule-application-addresscqrs-addressupdatecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-delete--api-addresses--id-"></a>

### DELETE /api/Addresses/{id}

- **Tags:** - آدرس ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-get--api-addresses--id-"></a>

### GET /api/Addresses/{id}

- **Tags:** - آدرس ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.AddressCQRS.AddressGetByIdDTO]](#schema-abstractions-application-dtos-baseresult-1-authmodule-application-addresscqrs-addressgetbyiddto-) | —       |

<a id="operation-get--api-addresses-getdefault"></a>

### GET /api/Addresses/GetDefault

- **Tags:** - آدرس ها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.AddressCQRS.AddressGetByIdDTO]](#schema-abstractions-application-dtos-baseresult-1-authmodule-application-addresscqrs-addressgetbyiddto-) | —       |

<a id="operation-post--api-addresses-setasdefault"></a>

### POST /api/Addresses/SetAsDefault

- **Tags:** - آدرس ها
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                                 | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [AuthModule.Application.AddressCQRS.AddressSetAsDefaultCommand](#schema-authmodule-application-addresscqrs-addresssetasdefaultcommand) | —       |
| `text/json`          | [AuthModule.Application.AddressCQRS.AddressSetAsDefaultCommand](#schema-authmodule-application-addresscqrs-addresssetasdefaultcommand) | —       |
| `application/*+json` | [AuthModule.Application.AddressCQRS.AddressSetAsDefaultCommand](#schema-authmodule-application-addresscqrs-addresssetasdefaultcommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                        | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.Contracts.SetDefaultStoreDTO]](#schema-abstractions-application-dtos-baseresult-1-authmodule-application-contracts-setdefaultstoredto-) | —       |

<a id="operation-post--api-auth-checkaccesstoken"></a>

### POST /api/Auth/CheckAccessToken

- **Tags:** - احراز هویت مشتری
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type          | Schema | Example |
| --------------------- | ------ | ------- |
| `multipart/form-data` | object | —       |

#### Responses

| Status | Description | Content                                                                                                                                              | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Boolean]](#schema-abstractions-application-dtos-baseresult-1-system-boolean-) | —       |

<a id="operation-get--api-auth-getcaptcha"></a>

### GET /api/Auth/GetCaptcha

- **Tags:** - احراز هویت مشتری
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                      | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.AuthCQRS.CaptchaDTO]](#schema-abstractions-application-dtos-baseresult-1-authmodule-application-authcqrs-captchadto-) | —       |

<a id="operation-post--api-auth-login"></a>

### POST /api/Auth/Login

- **Tags:** - احراز هویت مشتری
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                               | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [AuthModule.Application.AuthCQRS.CustomerLoginCommand](#schema-authmodule-application-authcqrs-customerlogincommand) | —       |
| `text/json`          | [AuthModule.Application.AuthCQRS.CustomerLoginCommand](#schema-authmodule-application-authcqrs-customerlogincommand) | —       |
| `application/*+json` | [AuthModule.Application.AuthCQRS.CustomerLoginCommand](#schema-authmodule-application-authcqrs-customerlogincommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                              | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Boolean]](#schema-abstractions-application-dtos-baseresult-1-system-boolean-) | —       |

<a id="operation-post--api-auth-refreshtoken"></a>

### POST /api/Auth/RefreshToken

- **Tags:** - احراز هویت مشتری
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                         | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [Abstractions.Application.CQRS.RefreshTokenCommand](#schema-abstractions-application-cqrs-refreshtokencommand) | —       |
| `text/json`          | [Abstractions.Application.CQRS.RefreshTokenCommand](#schema-abstractions-application-cqrs-refreshtokencommand) | —       |
| `application/*+json` | [Abstractions.Application.CQRS.RefreshTokenCommand](#schema-abstractions-application-cqrs-refreshtokencommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[Abstractions.Application.CQRS.LoginResponse`1[Abstractions.Application.DTOs.UserTokenDTO]]](#schema-abstractions-application-dtos-baseresult-1-abstractions-application-cqrs-loginresponse-1-abstractions-application-dtos-usertokendto--) | —       |

<a id="operation-post--api-auth-resendcode"></a>

### POST /api/Auth/ResendCode

- **Tags:** - احراز هویت مشتری
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                         | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `application/json`   | [AuthModule.Application.AuthCQRS.CustomerResendCodeCommand](#schema-authmodule-application-authcqrs-customerresendcodecommand) | —       |
| `text/json`          | [AuthModule.Application.AuthCQRS.CustomerResendCodeCommand](#schema-authmodule-application-authcqrs-customerresendcodecommand) | —       |
| `application/*+json` | [AuthModule.Application.AuthCQRS.CustomerResendCodeCommand](#schema-authmodule-application-authcqrs-customerresendcodecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-post--api-auth-verifycode"></a>

### POST /api/Auth/VerifyCode

- **Tags:** - احراز هویت مشتری
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                         | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `application/json`   | [AuthModule.Application.AuthCQRS.CustomerVerifyCodeCommand](#schema-authmodule-application-authcqrs-customerverifycodecommand) | —       |
| `text/json`          | [AuthModule.Application.AuthCQRS.CustomerVerifyCodeCommand](#schema-authmodule-application-authcqrs-customerverifycodecommand) | —       |
| `application/*+json` | [AuthModule.Application.AuthCQRS.CustomerVerifyCodeCommand](#schema-authmodule-application-authcqrs-customerverifycodecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[Abstractions.Application.CQRS.LoginResponse`1[Abstractions.Application.DTOs.UserTokenDTO]]](#schema-abstractions-application-dtos-baseresult-1-abstractions-application-cqrs-loginresponse-1-abstractions-application-dtos-usertokendto--) | —       |

<a id="operation-get--api-provinces"></a>

### GET /api/Provinces

- **Tags:** - استان ها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                              | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[Abstractions.Application.DTOs.SelectListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-abstractions-application-dtos-selectlistdto--) | —       |

<a id="operation-get--api-slides"></a>

### GET /api/Slides

- **Tags:** - اسلاید ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name           | In    | Required | Schema                                                                                   | Description                                                        |
| -------------- | ----- | -------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `PlatformType` | query | No       | [Abstractions.Domain.Enums.PlatformType](#schema-abstractions-domain-enums-platformtype) | نوع پلتفرم کاربر:<br><br>1 => Web<br>2 => Mobile<br>3 => MobileApp |
| `Count`        | query | No       | integer (int32)                                                                          | ماکزیمم تعداد اسلایدها                                             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                              | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.SlideCQRS.SlideGetHomeListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-slidecqrs-slidegethomelistdto--) | —       |

<a id="operation-get--api-brands-gethomebrands"></a>

### GET /api/Brands/GetHomeBrands

- **Tags:** - برندها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name    | In    | Required | Schema                                                                                                                         | Description |
| ------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `query` | query | No       | [CatalogModule.Application.BrandCQRS.BrandGetHomeListQuery](#schema-catalogmodule-application-brandcqrs-brandgethomelistquery) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                      | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.BrandCQRS.BrandGetHomeListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-brandcqrs-brandgethomelistdto--) | —       |

<a id="operation-get--api-brands-search"></a>

### GET /api/Brands/Search

- **Tags:** - برندها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name          | In    | Required | Schema                                                                           | Description                                                                             |
| ------------- | ----- | -------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `Type`        | query | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype) | نوع محصول یا سایت (سوپر مارکتی / لوازم خانگی)<br><br>1 => SuperMarket<br>2 => Appliance |
| `Text`        | query | No       | string                                                                           | متن جستجو                                                                               |
| `JustEnabled` | query | No       | boolean                                                                          | فقط رکورد های فعال                                                                      |
| `Count`       | query | No       | integer (int32)                                                                  | تعداد آیتم های بازگشتی. باید بین 0 تا 100 باشد                                          |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                              | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[Abstractions.Application.DTOs.SelectListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-abstractions-application-dtos-selectlistdto--) | —       |

<a id="operation-get--api-banners-getbannersbylayoutid--layoutid-"></a>

### GET /api/Banners/GetBannersByLayoutId/{LayoutId}

- **Tags:** - بنرها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In    | Required | Schema          | Description |
| ---------- | ----- | -------- | --------------- | ----------- |
| `LayoutId` | query | No       | integer (int64) |             |
| `LayoutId` | path  | Yes      | string          |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.BannerCQRS.BannerDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-bannercqrs-bannerdto--) | —       |

<a id="operation-get--api-banners-getblogbanners"></a>

### GET /api/Banners/GetBlogBanners

- **Tags:** - بنرها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.BannerCQRS.BannerDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-bannercqrs-bannerdto--) | —       |

<a id="operation-get--api-banners-getbytype"></a>

### GET /api/Banners/GetByType

- **Tags:** - بنرها
- **Summary:** گرفتن بنر بر اساس نوع بنر<br>0 => سایر \|<br>1 => بنر های کنار اسلاید \|<br>2 => بنر های بلاگ \|<br>3 => بنر های دسته بندی<br>4 => بنر لاگین
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name   | In    | Required | Schema                                                                         | Description                                                                                                                |
| ------ | ----- | -------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `Type` | query | No       | [CmsModule.Domain.Enums.BannerType](#schema-cmsmodule-domain-enums-bannertype) | نوع بنر<br>0 => سایر \|<br>1 => بنر های کنار اسلاید \|<br>2 => بنر های بلاگ \|<br>3 => بنر های دسته بندی<br>4 => بنر لاگین |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.BannerCQRS.BannerDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-bannercqrs-bannerdto--) | —       |

<a id="operation-get--api-banners-getcategorybanners"></a>

### GET /api/Banners/GetCategoryBanners

- **Tags:** - بنرها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.BannerCQRS.BannerDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-bannercqrs-bannerdto--) | —       |

<a id="operation-get--api-banners-getloginbanners"></a>

### GET /api/Banners/GetLoginBanners

- **Tags:** - بنرها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.BannerCQRS.BannerDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-bannercqrs-bannerdto--) | —       |

<a id="operation-get--api-banners-getslidesidebanners"></a>

### GET /api/Banners/GetSlideSideBanners

- **Tags:** - بنرها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.BannerCQRS.BannerDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-bannercqrs-bannerdto--) | —       |

<a id="operation-get--api-faq"></a>

### GET /api/Faq

- **Tags:** - پرسش های متداول
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                              | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.FaqCQRS.FaqGetListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-faqcqrs-faqgetlistdto--) | —       |

<a id="operation-get--api-profile"></a>

### GET /api/Profile

- **Tags:** - پروفایل کاربر
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                              | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.CustomerCQRS.CustomerGetByIdDTO]](#schema-abstractions-application-dtos-baseresult-1-authmodule-application-customercqrs-customergetbyiddto-) | —       |

<a id="operation-put--api-profile"></a>

### PUT /api/Profile

- **Tags:** - پروفایل کاربر
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                         | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `application/json`   | [AuthModule.Application.CustomerCQRS.CustomerUpdateCommand](#schema-authmodule-application-customercqrs-customerupdatecommand) | —       |
| `text/json`          | [AuthModule.Application.CustomerCQRS.CustomerUpdateCommand](#schema-authmodule-application-customercqrs-customerupdatecommand) | —       |
| `application/*+json` | [AuthModule.Application.CustomerCQRS.CustomerUpdateCommand](#schema-authmodule-application-customercqrs-customerupdatecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-get--api-profile-getlastlogin"></a>

### GET /api/Profile/GetLastLogin

- **Tags:** - پروفایل کاربر
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                              | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[Abstractions.Application.DTOs.LastLoginInfoDTO]](#schema-abstractions-application-dtos-baseresult-1-abstractions-application-dtos-lastlogininfodto-) | —       |

<a id="operation-get--api-profile-getloginlogs"></a>

### GET /api/Profile/GetLoginLogs

- **Tags:** - پروفایل کاربر
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name         | In    | Required | Schema             | Description |
| ------------ | ----- | -------- | ------------------ | ----------- |
| `Page`       | query | No       | integer (int32)    |             |
| `PageLength` | query | No       | integer (int32)    |             |
| `IsSuccess`  | query | No       | boolean            |             |
| `StartDate`  | query | No       | string (date-time) |             |
| `EndDate`    | query | No       | string (date-time) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[LogModule.Application.LoginLogCQRS.LoginLogGetCustomerListDTO]](#schema-abstractions-application-dtos-baseresult-1-logmodule-application-loginlogcqrs-loginloggetcustomerlistdto-) | —       |

<a id="operation-get--api-posts-getdetails"></a>

### GET /api/Posts/GetDetails

- **Tags:** - پست ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In    | Required | Schema          | Description |
| ---- | ----- | -------- | --------------- | ----------- |
| `Id` | query | No       | integer (int64) | شناسه       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                  | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.PostCQRS.PostGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-postcqrs-postgetdetailsdto-) | —       |

<a id="operation-get--api-posts-search"></a>

### GET /api/Posts/Search

- **Tags:** - پست ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name         | In    | Required | Schema          | Description |
| ------------ | ----- | -------- | --------------- | ----------- |
| `TagId`      | query | No       | integer (int64) |             |
| `CategoryId` | query | No       | integer (int64) |             |
| `Text`       | query | No       | string          |             |
| `Page`       | query | No       | integer (int32) |             |
| `PageLength` | query | No       | integer (int32) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                  | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.PostCQRS.PostGetListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-postcqrs-postgetlistdto--) | —       |

<a id="operation-get--api-advertisements"></a>

### GET /api/Advertisements

- **Tags:** - تبلیغات بالای صفحه
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name           | In    | Required | Schema                                                                                   | Description                                                        |
| -------------- | ----- | -------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `PlatformType` | query | No       | [Abstractions.Domain.Enums.PlatformType](#schema-abstractions-domain-enums-platformtype) | نوع پلتفرم کاربر:<br><br>1 => Web<br>2 => Mobile<br>3 => MobileApp |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.AdvertisementCQRS.AdvertisementGetHomeDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-advertisementcqrs-advertisementgethomedto-) | —       |

<a id="operation-get--api-promotions"></a>

### GET /api/Promotions

- **Tags:** - تبلیغات پاپ آپ
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name           | In    | Required | Schema                                                                                   | Description                                                        |
| -------------- | ----- | -------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `PlatformType` | query | No       | [Abstractions.Domain.Enums.PlatformType](#schema-abstractions-domain-enums-platformtype) | نوع پلتفرم کاربر:<br><br>1 => Web<br>2 => Mobile<br>3 => MobileApp |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.PromotionCQRS.PromotionGetHomeDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-promotioncqrs-promotiongethomedto-) | —       |

<a id="operation-get--api-contactus"></a>

### GET /api/ContactUs

- **Tags:** - تماس با ما
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ConstantCQRS.ConstantGetSupportInfoDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-constantcqrs-constantgetsupportinfodto-) | —       |

<a id="operation-post--api-contactus"></a>

### POST /api/ContactUs

- **Tags:** - تماس با ما
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                           | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [CrmModule.Application.ContactUsCQRS.ContactUsCreateCommand](#schema-crmmodule-application-contactuscqrs-contactuscreatecommand) | —       |
| `text/json`          | [CrmModule.Application.ContactUsCQRS.ContactUsCreateCommand](#schema-crmmodule-application-contactuscqrs-contactuscreatecommand) | —       |
| `application/*+json` | [CrmModule.Application.ContactUsCQRS.ContactUsCreateCommand](#schema-crmmodule-application-contactuscqrs-contactuscreatecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Int64]](#schema-abstractions-application-dtos-baseresult-1-system-int64-) | —       |

<a id="operation-get--api-blogcategories"></a>

### GET /api/BlogCategories

- **Tags:** - دسته بندی بلاگ
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name    | In    | Required | Schema                                                                                                                                             | Description |
| ------- | ----- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `query` | query | No       | [CmsModule.Application.CategoryCQRS.BlogCategoryGetHomeTreeViewQuery](#schema-cmsmodule-application-categorycqrs-blogcategorygethometreeviewquery) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.CategoryCQRS.BlogCategoryGetHomeTreeViewDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-categorycqrs-blogcategorygethometreeviewdto--) | —       |

<a id="operation-get--api-blogcategories--id-"></a>

### GET /api/BlogCategories/{id}

- **Tags:** - دسته بندی بلاگ
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                  | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.CategoryCQRS.CategoryGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-categorycqrs-categorygetdetailsdto-) | —       |

<a id="operation-get--api-categories"></a>

### GET /api/Categories

- **Tags:** - دسته بندی محصولات
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name    | In    | Required | Schema                                                                                                                                             | Description |
| ------- | ----- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `query` | query | No       | [CatalogModule.Application.CategoryCQRS.CategoryGetHomeTreeViewQuery](#schema-catalogmodule-application-categorycqrs-categorygethometreeviewquery) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                                                        | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.CategoryCQRS.ProductCategoryGetHomeTreeViewDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-categorycqrs-productcategorygethometreeviewdto--) | —       |

<a id="operation-get--api-categories--id-"></a>

### GET /api/Categories/{id}

- **Tags:** - دسته بندی محصولات
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.CategoryCQRS.CategoryGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-categorycqrs-categorygetdetailsdto-) | —       |

<a id="operation-get--api-categories-searchableproperties--id-"></a>

### GET /api/Categories/SearchableProperties/{id}

- **Tags:** - دسته بندی محصولات
- **Summary:** پروپرتی های دسته بندی برای صفحه جستجو
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description    |
| ---- | ---- | -------- | --------------- | -------------- |
| `id` | path | Yes      | integer (int64) | آیدی دسته بندی |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                        | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.PatternCQRS.PatternDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-patterncqrs-patterndto--) | —       |

<a id="operation-get--api-socialnetworks"></a>

### GET /api/SocialNetworks

- **Tags:** - شبکه های اجتماعی
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                                      | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.SocialNetworkCQRS.SocialNetworkGetListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-socialnetworkcqrs-socialnetworkgetlistdto--) | —       |

<a id="operation-get--api-cities"></a>

### GET /api/Cities

- **Tags:** - شهرها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name         | In    | Required | Schema          | Description |
| ------------ | ----- | -------- | --------------- | ----------- |
| `provinceId` | query | No       | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                  | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[AuthModule.Application.CityCQRS.CitySearchDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-authmodule-application-citycqrs-citysearchdto--) | —       |

<a id="operation-get--api-cities-search"></a>

### GET /api/Cities/Search

- **Tags:** - شهرها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name          | In    | Required | Schema          | Description                                    |
| ------------- | ----- | -------- | --------------- | ---------------------------------------------- |
| `ProvinceId`  | query | No       | integer (int64) |                                                |
| `Text`        | query | No       | string          | متن جستجو                                      |
| `JustEnabled` | query | No       | boolean         | فقط رکورد های فعال                             |
| `Count`       | query | No       | integer (int32) | تعداد آیتم های بازگشتی. باید بین 0 تا 100 باشد |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                  | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[AuthModule.Application.CityCQRS.CitySearchDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-authmodule-application-citycqrs-citysearchdto--) | —       |

<a id="operation-get--api-home-getfooterdescription"></a>

### GET /api/Home/GetFooterDescription

- **Tags:** - صفحه اصلی
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                            | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.String]](#schema-abstractions-application-dtos-baseresult-1-system-string-) | —       |

<a id="operation-get--api-home-getlayout"></a>

### GET /api/Home/GetLayout

- **Tags:** - صفحه اصلی
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name           | In    | Required | Schema                                                                                   | Description                                                         |
| -------------- | ----- | -------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `LayoutType`   | query | No       | [Abstractions.Domain.Enums.LayoutType](#schema-abstractions-domain-enums-layouttype)     | نوع لیوت:<br><br>1 => SuperMarketHomePage<br>2 => ApplianceHomePage |
| `PlatformType` | query | No       | [Abstractions.Domain.Enums.PlatformType](#schema-abstractions-domain-enums-platformtype) | نوع پلتفرم کاربر:<br><br>1 => Web<br>2 => Mobile<br>3 => MobileApp  |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.LayoutCQRS.LayoutGetHomeListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-layoutcqrs-layoutgethomelistdto--) | —       |

<a id="operation-get--api-home-getmetatags"></a>

### GET /api/Home/GetMetaTags

- **Tags:** - صفحه اصلی
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ConstantCQRS.ConstantGetHomeMetaTagDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-constantcqrs-constantgethomemetatagdto-) | —       |

<a id="operation-delete--api-favorites"></a>

### DELETE /api/Favorites

- **Tags:** - علاقه مندی ها
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                               | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `application/json`   | [CatalogModule.Application.FavoriteCQRS.FavoriteRemoveCommand](#schema-catalogmodule-application-favoritecqrs-favoriteremovecommand) | —       |
| `text/json`          | [CatalogModule.Application.FavoriteCQRS.FavoriteRemoveCommand](#schema-catalogmodule-application-favoritecqrs-favoriteremovecommand) | —       |
| `application/*+json` | [CatalogModule.Application.FavoriteCQRS.FavoriteRemoveCommand](#schema-catalogmodule-application-favoritecqrs-favoriteremovecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-get--api-favorites"></a>

### GET /api/Favorites

- **Tags:** - علاقه مندی ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name         | In    | Required | Schema          | Description |
| ------------ | ----- | -------- | --------------- | ----------- |
| `Page`       | query | No       | integer (int32) |             |
| `PageLength` | query | No       | integer (int32) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.FavoriteCQRS.FavoriteGetListDTO]](#schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-favoritecqrs-favoritegetlistdto-) | —       |

<a id="operation-post--api-favorites"></a>

### POST /api/Favorites

- **Tags:** - علاقه مندی ها
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                         | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `application/json`   | [CatalogModule.Application.FavoriteCQRS.FavoriteAddCommand](#schema-catalogmodule-application-favoritecqrs-favoriteaddcommand) | —       |
| `text/json`          | [CatalogModule.Application.FavoriteCQRS.FavoriteAddCommand](#schema-catalogmodule-application-favoritecqrs-favoriteaddcommand) | —       |
| `application/*+json` | [CatalogModule.Application.FavoriteCQRS.FavoriteAddCommand](#schema-catalogmodule-application-favoritecqrs-favoriteaddcommand) | —       |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-post--api-favorites-getfavoriteids"></a>

### POST /api/Favorites/GetFavoriteIds

- **Tags:** - علاقه مندی ها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[System.Int64]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-system-int64--) | —       |

<a id="operation-get--api-factors"></a>

### GET /api/Factors

- **Tags:** - فاکتور ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name         | In    | Required | Schema                                                                                              | Description                                                                                                                              |
| ------------ | ----- | -------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `Page`       | query | No       | integer (int32)                                                                                     |                                                                                                                                          |
| `PageLength` | query | No       | integer (int32)                                                                                     |                                                                                                                                          |
| `Status`     | query | No       | [OrderingModule.Domain.Enums.BasketStatus](#schema-orderingmodule-domain-enums-basketstatus)        | 0 = Open (سبد باز)<br>1 = Paid (ثبت سفارش)<br>2 = Delivered (تحویل شده)<br>3 = Canceled (لغو شده)<br>10 = ImperfectPayment (تراکنش ناقص) |
| `Statuses`   | query | No       | array<[OrderingModule.Domain.Enums.BasketStatus](#schema-orderingmodule-domain-enums-basketstatus)> |                                                                                                                                          |
| `FactorNum`  | query | No       | string                                                                                              |                                                                                                                                          |
| `StoreId`    | query | No       | integer (int64)                                                                                     |                                                                                                                                          |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                              | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.FactorCQRS.FactorGetCustomerListDTO]](#schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-factorcqrs-factorgetcustomerlistdto-) | —       |

<a id="operation-get--api-factors--id-"></a>

### GET /api/Factors/{id}

- **Tags:** - فاکتور ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.FactorCQRS.FactorGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-factorcqrs-factorgetdetailsdto-) | —       |

<a id="operation-get--api-products--id-"></a>

### GET /api/Products/{id}

- **Tags:** - محصولات
- **Summary:** جزییات یک محصول
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) | آیدی محصول  |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.ProductCQRS.ProductFrontDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-productcqrs-productfrontdetailsdto-) | —       |

<a id="operation-get--api-products-geteffectiveproperty--id-"></a>

### GET /api/Products/GetEffectiveProperty/{id}

- **Tags:** - محصولات
- **Summary:** گرفتن مشخصه تاثیر گذار روی قیمت محصول به همراه لیست آیتمها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In    | Required | Schema          | Description |
| ---- | ----- | -------- | --------------- | ----------- |
| `id` | query | No       | integer (int64) |             |
| `id` | path  | Yes      | string          |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                  | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.PatternCQRS.PatternDTO]](#schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-patterncqrs-patterndto-) | —       |

<a id="operation-get--api-products-getprodutsbylayoutid"></a>

### GET /api/Products/GetProdutsByLayoutId

- **Tags:** - محصولات
- **Summary:** گرفتن محصولات یک لیوت مشخص
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In    | Required | Schema          | Description |
| ---------- | ----- | -------- | --------------- | ----------- |
| `LayoutId` | query | No       | integer (int64) |             |
| `Count`    | query | No       | integer (int32) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.ProductCQRS.ProductItemDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-productcqrs-productitemdto--) | —       |

<a id="operation-post--api-products-search"></a>

### POST /api/Products/Search

- **Tags:** - محصولات
- **Summary:** جستجو محصولات بر اساس دسته بندی، تگ، برند و ...
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                                 | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [CatalogModule.Application.ProductCQRS.ProductFrontSearchQuery](#schema-catalogmodule-application-productcqrs-productfrontsearchquery) | —       |
| `text/json`          | [CatalogModule.Application.ProductCQRS.ProductFrontSearchQuery](#schema-catalogmodule-application-productcqrs-productfrontsearchquery) | —       |
| `application/*+json` | [CatalogModule.Application.ProductCQRS.ProductFrontSearchQuery](#schema-catalogmodule-application-productcqrs-productfrontsearchquery) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.ProductCQRS.ProductItemDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-productcqrs-productitemdto--) | —       |

<a id="operation-get--api-products-searchbar"></a>

### GET /api/Products/Searchbar

- **Tags:** - محصولات
- **Summary:** جستجو محصولات در سرچ بار بالای سایت
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name            | In    | Required | Schema          | Description |
| --------------- | ----- | -------- | --------------- | ----------- |
| `Text`          | query | No       | string          | متن جستجو   |
| `ProductCount`  | query | No       | integer (int32) |             |
| `CategoryCount` | query | No       | integer (int32) |             |
| `BrandCount`    | query | No       | integer (int32) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.ProductCQRS.ProductSearchbarDTO]](#schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-productcqrs-productsearchbardto-) | —       |

<a id="operation-get--api-notice"></a>

### GET /api/Notice

- **Tags:** اعلانات
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                                                | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[NotificationModule.Application.AdminNoticeCQRS.AdminNoticeGetListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-notificationmodule-application-adminnoticecqrs-adminnoticegetlistdto--) | —       |

<a id="operation-get--api-payments"></a>

### GET /api/Payments

- **Tags:** پرداخت ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name         | In    | Required | Schema             | Description |
| ------------ | ----- | -------- | ------------------ | ----------- |
| `Page`       | query | No       | integer (int32)    |             |
| `PageLength` | query | No       | integer (int32)    |             |
| `FactorNum`  | query | No       | string             |             |
| `RefNum`     | query | No       | string             |             |
| `StartDate`  | query | No       | string (date-time) |             |
| `EndDate`    | query | No       | string (date-time) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[FinancialModule.Application.PaymentCQRS.PaymentGetCustomerListDTO]](#schema-abstractions-application-dtos-baseresult-1-financialmodule-application-paymentcqrs-paymentgetcustomerlistdto-) | —       |

<a id="operation-get--api-payments-getdetails--id-"></a>

### GET /api/Payments/GetDetails/{id}

- **Tags:** پرداخت ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.FactorCQRS.FactorGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-factorcqrs-factorgetdetailsdto-) | —       |

<a id="operation-get--api-tickets"></a>

### GET /api/Tickets

- **Tags:** تیکت ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name         | In    | Required | Schema                                                                             | Description                                                                        |
| ------------ | ----- | -------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `Page`       | query | No       | integer (int32)                                                                    |                                                                                    |
| `PageLength` | query | No       | integer (int32)                                                                    |                                                                                    |
| `TicketId`   | query | No       | integer (int64)                                                                    |                                                                                    |
| `Status`     | query | No       | [CrmModule.Domain.Enums.TicketStatus](#schema-crmmodule-domain-enums-ticketstatus) | 0 = Open (در انتظار پاسخ)<br>1 = Answered (پاسخ داده شده)<br>2 = Closed (بسته شده) |
| `Text`       | query | No       | string                                                                             |                                                                                    |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CrmModule.Application.TicketCQRS.TicketGetCustomerDTO]](#schema-abstractions-application-dtos-baseresult-1-crmmodule-application-ticketcqrs-ticketgetcustomerdto-) | —       |

<a id="operation-post--api-tickets"></a>

### POST /api/Tickets

- **Tags:** تیکت ها
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type          | Schema | Example |
| --------------------- | ------ | ------- |
| `multipart/form-data` | object | —       |

#### Responses

| Status | Description | Content                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Int64]](#schema-abstractions-application-dtos-baseresult-1-system-int64-) | —       |

<a id="operation-get--api-tickets--id-"></a>

### GET /api/Tickets/{id}

- **Tags:** تیکت ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CrmModule.Application.TicketCQRS.TicketGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-crmmodule-application-ticketcqrs-ticketgetdetailsdto-) | —       |

<a id="operation-get--api-tickets-getunseenmessagecount"></a>

### GET /api/Tickets/GetUnseenMessageCount

- **Tags:** تیکت ها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Int32]](#schema-abstractions-application-dtos-baseresult-1-system-int32-) | —       |

<a id="operation-post--api-tickets-seenmessages--id-"></a>

### POST /api/Tickets/SeenMessages/{id}

- **Tags:** تیکت ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                              | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Boolean]](#schema-abstractions-application-dtos-baseresult-1-system-boolean-) | —       |

<a id="operation-post--api-tickets-sendmessage"></a>

### POST /api/Tickets/SendMessage

- **Tags:** تیکت ها
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type          | Schema | Example |
| --------------------- | ------ | ------- |
| `multipart/form-data` | object | —       |

#### Responses

| Status | Description | Content                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Int64]](#schema-abstractions-application-dtos-baseresult-1-system-int64-) | —       |

<a id="operation-get--api-deliverytimes-getappliancedeliverytimes"></a>

### GET /api/DeliveryTimes/GetApplianceDeliveryTimes

- **Tags:** زمانبندی ارسال
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name            | In    | Required | Schema          | Description |
| --------------- | ----- | -------- | --------------- | ----------- |
| `JustFreeTimes` | query | No       | boolean         |             |
| `BasketId`      | query | No       | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[LogisticModule.Application.DeliveryDateCQRS.ApplianceAllDeliveryDateDTO]](#schema-abstractions-application-dtos-baseresult-1-logisticmodule-application-deliverydatecqrs-appliancealldeliverydatedto-) | —       |

<a id="operation-get--api-deliverytimes-getsupermarketdeliverytimes"></a>

### GET /api/DeliveryTimes/GetSuperMarketDeliveryTimes

- **Tags:** زمانبندی ارسال
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name            | In    | Required | Schema          | Description |
| --------------- | ----- | -------- | --------------- | ----------- |
| `JustFreeTimes` | query | No       | boolean         |             |
| `BasketId`      | query | No       | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[LogisticModule.Application.DeliveryDateCQRS.SuperMarketDeliveryDateDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-logisticmodule-application-deliverydatecqrs-supermarketdeliverydatedto--) | —       |

<a id="operation-post--api-deliverytimes-setappliancedeliverytime"></a>

### POST /api/DeliveryTimes/SetApplianceDeliveryTime

- **Tags:** زمانبندی ارسال
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                                                                         | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `application/json`   | [LogisticModule.Application.DeliveryTimeCQRS.SetApplianceBasketDeliveryTimeCommand](#schema-logisticmodule-application-deliverytimecqrs-setappliancebasketdeliverytimecommand) | —       |
| `text/json`          | [LogisticModule.Application.DeliveryTimeCQRS.SetApplianceBasketDeliveryTimeCommand](#schema-logisticmodule-application-deliverytimecqrs-setappliancebasketdeliverytimecommand) | —       |
| `application/*+json` | [LogisticModule.Application.DeliveryTimeCQRS.SetApplianceBasketDeliveryTimeCommand](#schema-logisticmodule-application-deliverytimecqrs-setappliancebasketdeliverytimecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-post--api-deliverytimes-setsupermarketdeliverytime"></a>

### POST /api/DeliveryTimes/SetSuperMarketDeliveryTime

- **Tags:** زمانبندی ارسال
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                                                                             | Example |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [LogisticModule.Application.DeliveryTimeCQRS.SetSuperMarketBasketDeliveryTimeCommand](#schema-logisticmodule-application-deliverytimecqrs-setsupermarketbasketdeliverytimecommand) | —       |
| `text/json`          | [LogisticModule.Application.DeliveryTimeCQRS.SetSuperMarketBasketDeliveryTimeCommand](#schema-logisticmodule-application-deliverytimecqrs-setsupermarketbasketdeliverytimecommand) | —       |
| `application/*+json` | [LogisticModule.Application.DeliveryTimeCQRS.SetSuperMarketBasketDeliveryTimeCommand](#schema-logisticmodule-application-deliverytimecqrs-setsupermarketbasketdeliverytimecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-post--api-baskets-addtobasket"></a>

### POST /api/Baskets/AddToBasket

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                           | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [OrderingModule.Application.BasketCQRS.BasketAddItemCommand](#schema-orderingmodule-application-basketcqrs-basketadditemcommand) | —       |
| `text/json`          | [OrderingModule.Application.BasketCQRS.BasketAddItemCommand](#schema-orderingmodule-application-basketcqrs-basketadditemcommand) | —       |
| `application/*+json` | [OrderingModule.Application.BasketCQRS.BasketAddItemCommand](#schema-orderingmodule-application-basketcqrs-basketadditemcommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.OpenBasketSimpleDTO]](#schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-openbasketsimpledto-) | —       |

<a id="operation-get--api-baskets-canusediscount--basketid-"></a>

### GET /api/Baskets/CanUseDiscount/{basketId}

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In   | Required | Schema          | Description |
| ---------- | ---- | -------- | --------------- | ----------- |
| `basketId` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                              | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Boolean]](#schema-abstractions-application-dtos-baseresult-1-system-boolean-) | —       |

<a id="operation-post--api-baskets-checkdiscount"></a>

### POST /api/Baskets/CheckDiscount

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                                       | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [OrderingModule.Application.BasketCQRS.BasketCheckDiscountCommand](#schema-orderingmodule-application-basketcqrs-basketcheckdiscountcommand) | —       |
| `text/json`          | [OrderingModule.Application.BasketCQRS.BasketCheckDiscountCommand](#schema-orderingmodule-application-basketcqrs-basketcheckdiscountcommand) | —       |
| `application/*+json` | [OrderingModule.Application.BasketCQRS.BasketCheckDiscountCommand](#schema-orderingmodule-application-basketcqrs-basketcheckdiscountcommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Nullable`1[System.Int64]]](#schema-abstractions-application-dtos-baseresult-1-system-nullable-1-system-int64--) | —       |

<a id="operation-post--api-baskets-checkstoreminorderprice--basketid-"></a>

### POST /api/Baskets/CheckStoreMinOrderPrice/{basketId}

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In   | Required | Schema          | Description |
| ---------- | ---- | -------- | --------------- | ----------- |
| `basketId` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-post--api-baskets-deletediscount--basketid-"></a>

### POST /api/Baskets/DeleteDiscount/{basketId}

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In   | Required | Schema          | Description |
| ---------- | ---- | -------- | --------------- | ----------- |
| `basketId` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-post--api-baskets-deleteitem"></a>

### POST /api/Baskets/DeleteItem

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                                 | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [OrderingModule.Application.BasketCQRS.BasketRemoveItemCommand](#schema-orderingmodule-application-basketcqrs-basketremoveitemcommand) | —       |
| `text/json`          | [OrderingModule.Application.BasketCQRS.BasketRemoveItemCommand](#schema-orderingmodule-application-basketcqrs-basketremoveitemcommand) | —       |
| `application/*+json` | [OrderingModule.Application.BasketCQRS.BasketRemoveItemCommand](#schema-orderingmodule-application-basketcqrs-basketremoveitemcommand) | —       |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-get--api-baskets-getcheckoutdetails"></a>

### GET /api/Baskets/GetCheckoutDetails

- **Tags:** سبد خرید
- **Summary:** گرفتن اطلاعات سبد خرید پیش از پرداخت
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name             | In    | Required | Schema          | Description |
| ---------------- | ----- | -------- | --------------- | ----------- |
| `BasketId`       | query | No       | integer (int64) |             |
| `RemoveDiscount` | query | No       | boolean         |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                              | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.BasketCheckoutDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-basketcheckoutdetailsdto-) | —       |

<a id="operation-get--api-baskets-getopenbasket"></a>

### GET /api/Baskets/GetOpenBasket

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.OpenBasketSimpleDTO]](#schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-openbasketsimpledto-) | —       |

<a id="operation-get--api-baskets-getpaygates"></a>

### GET /api/Baskets/GetPaygates

- **Tags:** سبد خرید
- **Summary:** لیست درگاه های پرداخت.<br>وقتی روش پرداخت درگاه بانکی باشد
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[FinancialModule.Application.PaygateCQRS.PaygateDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-financialmodule-application-paygatecqrs-paygatedto--) | —       |

<a id="operation-get--api-baskets-getpaytypes--basketid-"></a>

### GET /api/Baskets/GetPayTypes/{basketId}

- **Tags:** سبد خرید
- **Summary:** لیست روش های پرداخت
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In   | Required | Schema          | Description |
| ---------- | ---- | -------- | --------------- | ----------- |
| `basketId` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                              | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[Abstractions.Application.DTOs.SelectListDTO]]](#schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-abstractions-application-dtos-selectlistdto--) | —       |

<a id="operation-get--api-baskets-getservicecost--basketid-"></a>

### GET /api/Baskets/GetServiceCost/{basketId}

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In   | Required | Schema          | Description |
| ---------- | ---- | -------- | --------------- | ----------- |
| `basketId` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Int64]](#schema-abstractions-application-dtos-baseresult-1-system-int64-) | —       |

<a id="operation-get--api-baskets-getshippingcost--basketid-"></a>

### GET /api/Baskets/GetShippingCost/{basketId}

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In   | Required | Schema          | Description |
| ---------- | ---- | -------- | --------------- | ----------- |
| `basketId` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Int64]](#schema-abstractions-application-dtos-baseresult-1-system-int64-) | —       |

<a id="operation-get--api-baskets-getstoreminorderprice--basketid-"></a>

### GET /api/Baskets/GetStoreMinOrderPrice/{basketId}

- **Tags:** سبد خرید
- **Summary:** گرفتن کف مبلغ سفارش در فروشگاه
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In   | Required | Schema          | Description |
| ---------- | ---- | -------- | --------------- | ----------- |
| `basketId` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Int32]](#schema-abstractions-application-dtos-baseresult-1-system-int32-) | —       |

<a id="operation-get--api-baskets-hasdiscount--basketid-"></a>

### GET /api/Baskets/HasDiscount/{basketId}

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In   | Required | Schema          | Description |
| ---------- | ---- | -------- | --------------- | ----------- |
| `basketId` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                              | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Boolean]](#schema-abstractions-application-dtos-baseresult-1-system-boolean-) | —       |

<a id="operation-post--api-baskets-paybasket"></a>

### POST /api/Baskets/PayBasket

- **Tags:** سبد خرید
- **Summary:** بروزرسانی نهایی سفارش و پرداخت
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                   | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------- |
| `application/json`   | [OrderingModule.Application.BasketCQRS.BasketPayCommand](#schema-orderingmodule-application-basketcqrs-basketpaycommand) | —       |
| `text/json`          | [OrderingModule.Application.BasketCQRS.BasketPayCommand](#schema-orderingmodule-application-basketcqrs-basketpaycommand) | —       |
| `application/*+json` | [OrderingModule.Application.BasketCQRS.BasketPayCommand](#schema-orderingmodule-application-basketcqrs-basketpaycommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                      | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.BasketPayResponseDTO]](#schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-basketpayresponsedto-) | —       |

<a id="operation-post--api-baskets-savebasket"></a>

### POST /api/Baskets/SaveBasket

- **Tags:** سبد خرید
- **Summary:** ذخیره اطلاعات سبد خرید و گرفتن هزینه های سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                         | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `application/json`   | [OrderingModule.Application.BasketCQRS.BasketCommitCommand](#schema-orderingmodule-application-basketcqrs-basketcommitcommand) | —       |
| `text/json`          | [OrderingModule.Application.BasketCQRS.BasketCommitCommand](#schema-orderingmodule-application-basketcqrs-basketcommitcommand) | —       |
| `application/*+json` | [OrderingModule.Application.BasketCQRS.BasketCommitCommand](#schema-orderingmodule-application-basketcqrs-basketcommitcommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.BasketCommitResponseDTO]](#schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-basketcommitresponsedto-) | —       |

<a id="operation-post--api-baskets-updatequantity"></a>

### POST /api/Baskets/UpdateQuantity

- **Tags:** سبد خرید
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                                 | Example |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [OrderingModule.Application.BasketCQRS.BasketUpdateItemCommand](#schema-orderingmodule-application-basketcqrs-basketupdateitemcommand) | —       |
| `text/json`          | [OrderingModule.Application.BasketCQRS.BasketUpdateItemCommand](#schema-orderingmodule-application-basketcqrs-basketupdateitemcommand) | —       |
| `application/*+json` | [OrderingModule.Application.BasketCQRS.BasketUpdateItemCommand](#schema-orderingmodule-application-basketcqrs-basketupdateitemcommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                    | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.OpenBasketSimpleDTO]](#schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-openbasketsimpledto-) | —       |

<a id="operation-get--api-extrapages"></a>

### GET /api/ExtraPages

- **Tags:** صفحات جانبی
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ExtraPageCQRS.ExtraPageGetMenuItemsDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-extrapagecqrs-extrapagegetmenuitemsdto-) | —       |

<a id="operation-get--api-extrapages--id-"></a>

### GET /api/ExtraPages/{id}

- **Tags:** صفحات جانبی
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                      | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ExtraPageCQRS.ExtraPageGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-extrapagecqrs-extrapagegetdetailsdto-) | —       |

<a id="operation-get--api-extrapages-aboutus"></a>

### GET /api/ExtraPages/AboutUs

- **Tags:** صفحات جانبی
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                      | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ExtraPageCQRS.ExtraPageGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-extrapagecqrs-extrapagegetdetailsdto-) | —       |

<a id="operation-get--api-extrapages-agreement"></a>

### GET /api/ExtraPages/Agreement

- **Tags:** صفحات جانبی
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                      | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ExtraPageCQRS.ExtraPageGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-extrapagecqrs-extrapagegetdetailsdto-) | —       |

<a id="operation-get--api-stores--storeid-"></a>

### GET /api/Stores/{StoreId}

- **Tags:** فروشگاه ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name      | In   | Required | Schema          | Description |
| --------- | ---- | -------- | --------------- | ----------- |
| `StoreId` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                  | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.StoreCQRS.StoreGetByIdDTO]](#schema-abstractions-application-dtos-baseresult-1-authmodule-application-storecqrs-storegetbyiddto-) | —       |

<a id="operation-post--api-stores-getall"></a>

### POST /api/Stores/GetAll

- **Tags:** فروشگاه ها
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema          | Example |
| -------------------- | --------------- | ------- |
| `application/json`   | integer (int64) | —       |
| `text/json`          | integer (int64) | —       |
| `application/*+json` | integer (int64) | —       |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[Abstractions.Application.DTOs.ItemGridDTO`1[AuthModule.Application.StoreCQRS.StoreGetListDTO]]](#schema-abstractions-application-dtos-baseresult-1-abstractions-application-dtos-itemgriddto-1-authmodule-application-storecqrs-storegetlistdto--) | —       |

<a id="operation-get--api-stores-getdefault"></a>

### GET /api/Stores/GetDefault

- **Tags:** فروشگاه ها
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                  | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.StoreCQRS.StoreGetByIdDTO]](#schema-abstractions-application-dtos-baseresult-1-authmodule-application-storecqrs-storegetbyiddto-) | —       |

<a id="operation-get--api-comments"></a>

### GET /api/Comments

- **Tags:** کامنت ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name         | In    | Required | Schema                                                                                   | Description                                                                                                          |
| ------------ | ----- | -------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `Page`       | query | No       | integer (int32)                                                                          |                                                                                                                      |
| `PageLength` | query | No       | integer (int32)                                                                          |                                                                                                                      |
| `ProductId`  | query | No       | integer (int64)                                                                          |                                                                                                                      |
| `PostId`     | query | No       | integer (int64)                                                                          |                                                                                                                      |
| `SortType`   | query | No       | [CrmModule.Domain.Enums.CommentSortType](#schema-crmmodule-domain-enums-commentsorttype) | نوع مرتب سازی کامنت<br><br>0 => جدیدترین \|<br>1 => قدیمی ترین \|<br>2 => بیشترین امتیاز \|<br>3 => کمترین امتیاز \| |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                          | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CrmModule.Application.CommentCQRS.CommentGetFrontDTO]](#schema-abstractions-application-dtos-baseresult-1-crmmodule-application-commentcqrs-commentgetfrontdto-) | —       |

<a id="operation-post--api-comments-addlike--id-"></a>

### POST /api/Comments/AddLike/{id}

- **Tags:** کامنت ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-post--api-comments-create"></a>

### POST /api/Comments/Create

- **Tags:** کامنت ها
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                   | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------- |
| `application/json`   | [CrmModule.Application.CommentCQRS.CommentCreateCommand](#schema-crmmodule-application-commentcqrs-commentcreatecommand) | —       |
| `text/json`          | [CrmModule.Application.CommentCQRS.CommentCreateCommand](#schema-crmmodule-application-commentcqrs-commentcreatecommand) | —       |
| `application/*+json` | [CrmModule.Application.CommentCQRS.CommentCreateCommand](#schema-crmmodule-application-commentcqrs-commentcreatecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Int64]](#schema-abstractions-application-dtos-baseresult-1-system-int64-) | —       |

<a id="operation-post--api-comments-removelike--id-"></a>

### POST /api/Comments/RemoveLike/{id}

- **Tags:** کامنت ها
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name | In   | Required | Schema          | Description |
| ---- | ---- | -------- | --------------- | ----------- |
| `id` | path | Yes      | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                          | Headers |
| ------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult](#schema-abstractions-application-dtos-baseresult) | —       |

<a id="operation-get--api-surveys"></a>

### GET /api/Surveys

- **Tags:** نظرسنجی
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name       | In    | Required | Schema          | Description |
| ---------- | ----- | -------- | --------------- | ----------- |
| `SurveyId` | query | No       | integer (int64) |             |
| `FactorId` | query | No       | integer (int64) |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[SurveyModule.Application.SurveyCQRS.SurveyGetDetailsDTO]](#schema-abstractions-application-dtos-baseresult-1-surveymodule-application-surveycqrs-surveygetdetailsdto-) | —       |

<a id="operation-post--api-surveys"></a>

### POST /api/Surveys

- **Tags:** نظرسنجی
- **Security:** Inherited from the API-level security declaration

#### Request body

- **Required:** No

| Content type         | Schema                                                                                                                                                                 | Example |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `application/json`   | [SurveyModule.Application.SurveyResponseCQRS.SurveyResponseSaveResponseCommand](#schema-surveymodule-application-surveyresponsecqrs-surveyresponsesaveresponsecommand) | —       |
| `text/json`          | [SurveyModule.Application.SurveyResponseCQRS.SurveyResponseSaveResponseCommand](#schema-surveymodule-application-surveyresponsecqrs-surveyresponsesaveresponsecommand) | —       |
| `application/*+json` | [SurveyModule.Application.SurveyResponseCQRS.SurveyResponseSaveResponseCommand](#schema-surveymodule-application-surveyresponsecqrs-surveyresponsesaveresponsecommand) | —       |

#### Responses

| Status | Description | Content                                                                                                                                          | Headers |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[System.Int64]](#schema-abstractions-application-dtos-baseresult-1-system-int64-) | —       |

<a id="operation-get--api-appversions"></a>

### GET /api/AppVersions

- **Tags:** ورژن اپلیکیشن
- **Security:** Inherited from the API-level security declaration

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                                        | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.AppVersionCQRS.AppVersionGetCurrentVersionDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-appversioncqrs-appversiongetcurrentversiondto-) | —       |

<a id="operation-get--api-appversions-checkupdate"></a>

### GET /api/AppVersions/CheckUpdate

- **Tags:** ورژن اپلیکیشن
- **Security:** Inherited from the API-level security declaration

#### Parameters

| Name             | In    | Required | Schema | Description |
| ---------------- | ----- | -------- | ------ | ----------- |
| `CurrentVersion` | query | No       | string |             |

#### Responses

| Status | Description | Content                                                                                                                                                                                                                                            | Headers |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `200`  | OK          | `application/json`: [Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.AppVersionCQRS.AppVersionCheckUpdateDTO]](#schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-appversioncqrs-appversioncheckupdatedto-) | —       |

## Component schemas

<a id="schema-abstractions-application-authlevel"></a>

### Abstractions.Application.AuthLevel

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `4`, `5`, `6`
- **Description:** سطح دسترسی. برای اعضا است یا کاربران

**Allowed values:** `0`, `1`, `2`, `3`, `4`, `5`, `6`

<a id="schema-abstractions-application-cqrs-loginresponse-1-abstractions-application-dtos-usertokendto-"></a>

### Abstractions.Application.CQRS.LoginResponse`1[Abstractions.Application.DTOs.UserTokenDTO]

- **Definition:** object
- **Additional properties:** False

| Property       | Required | Schema                                                                                                   | Constraints / default | Description |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `user`         | No       | [Abstractions.Application.DTOs.UserTokenDTO](#schema-abstractions-application-dtos-usertokendto)         | —                     |             |
| `accessToken`  | No       | [Abstractions.Application.DTOs.TokenResponseDTO](#schema-abstractions-application-dtos-tokenresponsedto) | —                     |             |
| `refreshToken` | No       | [Abstractions.Application.DTOs.TokenResponseDTO](#schema-abstractions-application-dtos-tokenresponsedto) | —                     |             |

<a id="schema-abstractions-application-cqrs-refreshtokencommand"></a>

### Abstractions.Application.CQRS.RefreshTokenCommand

- **Definition:** object
- **Additional properties:** False

| Property       | Required | Schema         | Constraints / default | Description    |
| -------------- | -------- | -------------- | --------------------- | -------------- |
| `accessToken`  | No       | string or null | —                     | توکن دسترسی    |
| `refreshToken` | No       | string or null | —                     | توکن بروزرسانی |

<a id="schema-abstractions-application-dtos-baseresult"></a>

### Abstractions.Application.DTOs.BaseResult

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                | Constraints / default | Description                                       |
| ----------- | -------- | --------------------- | --------------------- | ------------------------------------------------- |
| `isSuccess` | No       | boolean               | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null        | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-abstractions-application-cqrs-loginresponse-1-abstractions-application-dtos-usertokendto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[Abstractions.Application.CQRS.LoginResponse`1[Abstractions.Application.DTOs.UserTokenDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                                                                         | Constraints / default | Description                                       |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [Abstractions.Application.CQRS.LoginResponse`1[Abstractions.Application.DTOs.UserTokenDTO]](#schema-abstractions-application-cqrs-loginresponse-1-abstractions-application-dtos-usertokendto-) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                                                                        | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                                                                          | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                                                                 | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-abstractions-application-dtos-itemgriddto-1-authmodule-application-storecqrs-storegetlistdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[Abstractions.Application.DTOs.ItemGridDTO`1[AuthModule.Application.StoreCQRS.StoreGetListDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                                                                                 | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [Abstractions.Application.DTOs.ItemGridDTO`1[AuthModule.Application.StoreCQRS.StoreGetListDTO]](#schema-abstractions-application-dtos-itemgriddto-1-authmodule-application-storecqrs-storegetlistdto-) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                                                                                | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                                                                                  | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                                                                         | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-abstractions-application-dtos-lastlogininfodto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[Abstractions.Application.DTOs.LastLoginInfoDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                   | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [Abstractions.Application.DTOs.LastLoginInfoDTO](#schema-abstractions-application-dtos-lastlogininfodto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                  | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                    | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                           | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-authmodule-application-addresscqrs-addressgetbyiddto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.AddressCQRS.AddressGetByIdDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                               | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [AuthModule.Application.AddressCQRS.AddressGetByIdDTO](#schema-authmodule-application-addresscqrs-addressgetbyiddto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                              | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                       | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-authmodule-application-authcqrs-captchadto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.AuthCQRS.CaptchaDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                           | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [AuthModule.Application.AuthCQRS.CaptchaDTO](#schema-authmodule-application-authcqrs-captchadto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                          | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                            | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                   | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-authmodule-application-contracts-setdefaultstoredto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.Contracts.SetDefaultStoreDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                             | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [AuthModule.Application.Contracts.SetDefaultStoreDTO](#schema-authmodule-application-contracts-setdefaultstoredto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                            | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                              | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                     | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-authmodule-application-customercqrs-customergetbyiddto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.CustomerCQRS.CustomerGetByIdDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                   | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [AuthModule.Application.CustomerCQRS.CustomerGetByIdDTO](#schema-authmodule-application-customercqrs-customergetbyiddto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                  | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                    | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                           | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-authmodule-application-storecqrs-storegetbyiddto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[AuthModule.Application.StoreCQRS.StoreGetByIdDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                       | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [AuthModule.Application.StoreCQRS.StoreGetByIdDTO](#schema-authmodule-application-storecqrs-storegetbyiddto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                      | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                        | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                               | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-categorycqrs-categorygetdetailsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.CategoryCQRS.CategoryGetDetailsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                               | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CatalogModule.Application.CategoryCQRS.CategoryGetDetailsDTO](#schema-catalogmodule-application-categorycqrs-categorygetdetailsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                              | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                       | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-favoritecqrs-favoritegetlistdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.FavoriteCQRS.FavoriteGetListDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                         | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CatalogModule.Application.FavoriteCQRS.FavoriteGetListDTO](#schema-catalogmodule-application-favoritecqrs-favoritegetlistdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                        | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                          | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                 | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-patterncqrs-patterndto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.PatternCQRS.PatternDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                       | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CatalogModule.Application.PatternCQRS.PatternDTO](#schema-catalogmodule-application-patterncqrs-patterndto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                      | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                        | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                               | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-productcqrs-productfrontdetailsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.ProductCQRS.ProductFrontDetailsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                               | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CatalogModule.Application.ProductCQRS.ProductFrontDetailsDTO](#schema-catalogmodule-application-productcqrs-productfrontdetailsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                              | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                       | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-catalogmodule-application-productcqrs-productsearchbardto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CatalogModule.Application.ProductCQRS.ProductSearchbarDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                         | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CatalogModule.Application.ProductCQRS.ProductSearchbarDTO](#schema-catalogmodule-application-productcqrs-productsearchbardto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                        | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                          | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                 | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-advertisementcqrs-advertisementgethomedto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.AdvertisementCQRS.AdvertisementGetHomeDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                     | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.AdvertisementCQRS.AdvertisementGetHomeDTO](#schema-cmsmodule-application-advertisementcqrs-advertisementgethomedto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                    | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                      | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                             | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-appversioncqrs-appversioncheckupdatedto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.AppVersionCQRS.AppVersionCheckUpdateDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                 | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.AppVersionCQRS.AppVersionCheckUpdateDTO](#schema-cmsmodule-application-appversioncqrs-appversioncheckupdatedto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                  | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                         | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-appversioncqrs-appversiongetcurrentversiondto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.AppVersionCQRS.AppVersionGetCurrentVersionDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                             | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.AppVersionCQRS.AppVersionGetCurrentVersionDTO](#schema-cmsmodule-application-appversioncqrs-appversiongetcurrentversiondto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                            | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                              | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                     | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-categorycqrs-categorygetdetailsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.CategoryCQRS.CategoryGetDetailsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                       | Constraints / default | Description                                       |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.CategoryCQRS.CategoryGetDetailsDTO](#schema-cmsmodule-application-categorycqrs-categorygetdetailsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                      | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                        | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                               | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-constantcqrs-constantgethomemetatagdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ConstantCQRS.ConstantGetHomeMetaTagDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                               | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.ConstantCQRS.ConstantGetHomeMetaTagDTO](#schema-cmsmodule-application-constantcqrs-constantgethomemetatagdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                              | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                       | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-constantcqrs-constantgetsupportinfodto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ConstantCQRS.ConstantGetSupportInfoDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                               | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.ConstantCQRS.ConstantGetSupportInfoDTO](#schema-cmsmodule-application-constantcqrs-constantgetsupportinfodto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                              | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                       | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-extrapagecqrs-extrapagegetdetailsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ExtraPageCQRS.ExtraPageGetDetailsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                           | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.ExtraPageCQRS.ExtraPageGetDetailsDTO](#schema-cmsmodule-application-extrapagecqrs-extrapagegetdetailsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                          | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                            | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                   | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-extrapagecqrs-extrapagegetmenuitemsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.ExtraPageCQRS.ExtraPageGetMenuItemsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                               | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.ExtraPageCQRS.ExtraPageGetMenuItemsDTO](#schema-cmsmodule-application-extrapagecqrs-extrapagegetmenuitemsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                              | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                       | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-postcqrs-postgetdetailsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.PostCQRS.PostGetDetailsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                       | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.PostCQRS.PostGetDetailsDTO](#schema-cmsmodule-application-postcqrs-postgetdetailsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                      | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                        | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                               | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-cmsmodule-application-promotioncqrs-promotiongethomedto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CmsModule.Application.PromotionCQRS.PromotionGetHomeDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                     | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CmsModule.Application.PromotionCQRS.PromotionGetHomeDTO](#schema-cmsmodule-application-promotioncqrs-promotiongethomedto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                    | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                      | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                             | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-crmmodule-application-commentcqrs-commentgetfrontdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CrmModule.Application.CommentCQRS.CommentGetFrontDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                               | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CrmModule.Application.CommentCQRS.CommentGetFrontDTO](#schema-crmmodule-application-commentcqrs-commentgetfrontdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                              | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                       | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-crmmodule-application-ticketcqrs-ticketgetcustomerdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CrmModule.Application.TicketCQRS.TicketGetCustomerDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                 | Constraints / default | Description                                       |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CrmModule.Application.TicketCQRS.TicketGetCustomerDTO](#schema-crmmodule-application-ticketcqrs-ticketgetcustomerdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                  | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                         | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-crmmodule-application-ticketcqrs-ticketgetdetailsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[CrmModule.Application.TicketCQRS.TicketGetDetailsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                               | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [CrmModule.Application.TicketCQRS.TicketGetDetailsDTO](#schema-crmmodule-application-ticketcqrs-ticketgetdetailsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                              | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                       | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-financialmodule-application-paymentcqrs-paymentgetcustomerlistdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[FinancialModule.Application.PaymentCQRS.PaymentGetCustomerListDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                         | Constraints / default | Description                                       |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [FinancialModule.Application.PaymentCQRS.PaymentGetCustomerListDTO](#schema-financialmodule-application-paymentcqrs-paymentgetcustomerlistdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                        | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                          | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                 | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-logisticmodule-application-deliverydatecqrs-appliancealldeliverydatedto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[LogisticModule.Application.DeliveryDateCQRS.ApplianceAllDeliveryDateDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                                     | Constraints / default | Description                                       |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [LogisticModule.Application.DeliveryDateCQRS.ApplianceAllDeliveryDateDTO](#schema-logisticmodule-application-deliverydatecqrs-appliancealldeliverydatedto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                                    | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                                      | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                             | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-logmodule-application-loginlogcqrs-loginloggetcustomerlistdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[LogModule.Application.LoginLogCQRS.LoginLogGetCustomerListDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                 | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [LogModule.Application.LoginLogCQRS.LoginLogGetCustomerListDTO](#schema-logmodule-application-loginlogcqrs-loginloggetcustomerlistdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                  | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                         | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-basketcheckoutdetailsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.BasketCheckoutDetailsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                   | Constraints / default | Description                                       |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [OrderingModule.Application.BasketCQRS.BasketCheckoutDetailsDTO](#schema-orderingmodule-application-basketcqrs-basketcheckoutdetailsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                  | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                    | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                           | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-basketcommitresponsedto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.BasketCommitResponseDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                 | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [OrderingModule.Application.BasketCQRS.BasketCommitResponseDTO](#schema-orderingmodule-application-basketcqrs-basketcommitresponsedto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                  | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                         | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-basketpayresponsedto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.BasketPayResponseDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                           | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [OrderingModule.Application.BasketCQRS.BasketPayResponseDTO](#schema-orderingmodule-application-basketcqrs-basketpayresponsedto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                          | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                            | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                   | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-basketcqrs-openbasketsimpledto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.BasketCQRS.OpenBasketSimpleDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                         | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [OrderingModule.Application.BasketCQRS.OpenBasketSimpleDTO](#schema-orderingmodule-application-basketcqrs-openbasketsimpledto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                        | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                          | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                 | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-factorcqrs-factorgetcustomerlistdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.FactorCQRS.FactorGetCustomerListDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                   | Constraints / default | Description                                       |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [OrderingModule.Application.FactorCQRS.FactorGetCustomerListDTO](#schema-orderingmodule-application-factorcqrs-factorgetcustomerlistdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                                  | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                    | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                           | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-orderingmodule-application-factorcqrs-factorgetdetailsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[OrderingModule.Application.FactorCQRS.FactorGetDetailsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                         | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | [OrderingModule.Application.FactorCQRS.FactorGetDetailsDTO](#schema-orderingmodule-application-factorcqrs-factorgetdetailsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                        | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                          | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                 | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-surveymodule-application-surveycqrs-surveygetdetailsdto-"></a>

### Abstractions.Application.DTOs.BaseResult`1[SurveyModule.Application.SurveyCQRS.SurveyGetDetailsDTO]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                     | Constraints / default | Description                                       |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | [SurveyModule.Application.SurveyCQRS.SurveyGetDetailsDTO](#schema-surveymodule-application-surveycqrs-surveygetdetailsdto) | —                     |                                                   |
| `isSuccess` | No       | boolean                                                                                                                    | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                      | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                             | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-boolean-"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Boolean]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                | Constraints / default | Description                                       |
| ----------- | -------- | --------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | boolean               | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean               | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null        | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-abstractions-application-dtos-selectlistdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[Abstractions.Application.DTOs.SelectListDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                            | Constraints / default | Description                                       |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                           | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                             | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                    | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-authmodule-application-addresscqrs-addressgetcustomerlistquery--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[AuthModule.Application.AddressCQRS.AddressGetCustomerListQuery]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                                  | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[AuthModule.Application.AddressCQRS.AddressGetCustomerListQuery](#schema-authmodule-application-addresscqrs-addressgetcustomerlistquery)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                                                 | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                                   | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                          | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-authmodule-application-citycqrs-citysearchdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[AuthModule.Application.CityCQRS.CitySearchDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                | Constraints / default | Description                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[AuthModule.Application.CityCQRS.CitySearchDTO](#schema-authmodule-application-citycqrs-citysearchdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                               | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                 | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                        | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-brandcqrs-brandgethomelistdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.BrandCQRS.BrandGetHomeListDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                    | Constraints / default | Description                                       |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CatalogModule.Application.BrandCQRS.BrandGetHomeListDTO](#schema-catalogmodule-application-brandcqrs-brandgethomelistdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                                   | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                     | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                            | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-categorycqrs-productcategorygethometreeviewdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.CategoryCQRS.ProductCategoryGetHomeTreeViewDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                                                      | Constraints / default | Description                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CatalogModule.Application.CategoryCQRS.ProductCategoryGetHomeTreeViewDTO](#schema-catalogmodule-application-categorycqrs-productcategorygethometreeviewdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                                                                     | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                                                       | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                                              | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-layoutcqrs-layoutgethomelistdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.LayoutCQRS.LayoutGetHomeListDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                        | Constraints / default | Description                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CatalogModule.Application.LayoutCQRS.LayoutGetHomeListDTO](#schema-catalogmodule-application-layoutcqrs-layoutgethomelistdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                                       | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                         | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-patterncqrs-patterndto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.PatternCQRS.PatternDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                      | Constraints / default | Description                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CatalogModule.Application.PatternCQRS.PatternDTO](#schema-catalogmodule-application-patterncqrs-patterndto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                     | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                       | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                              | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-catalogmodule-application-productcqrs-productitemdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CatalogModule.Application.ProductCQRS.ProductItemDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                              | Constraints / default | Description                                       |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CatalogModule.Application.ProductCQRS.ProductItemDTO](#schema-catalogmodule-application-productcqrs-productitemdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                             | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                               | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                      | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-bannercqrs-bannerdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.BannerCQRS.BannerDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                          | Constraints / default | Description                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CmsModule.Application.BannerCQRS.BannerDTO](#schema-cmsmodule-application-bannercqrs-bannerdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                         | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                           | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                  | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-categorycqrs-blogcategorygethometreeviewdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.CategoryCQRS.BlogCategoryGetHomeTreeViewDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                                        | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CmsModule.Application.CategoryCQRS.BlogCategoryGetHomeTreeViewDTO](#schema-cmsmodule-application-categorycqrs-blogcategorygethometreeviewdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                                                       | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                                         | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                                | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-faqcqrs-faqgetlistdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.FaqCQRS.FaqGetListDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                            | Constraints / default | Description                                       |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CmsModule.Application.FaqCQRS.FaqGetListDTO](#schema-cmsmodule-application-faqcqrs-faqgetlistdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                           | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                             | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                    | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-postcqrs-postgetlistdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.PostCQRS.PostGetListDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                | Constraints / default | Description                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CmsModule.Application.PostCQRS.PostGetListDTO](#schema-cmsmodule-application-postcqrs-postgetlistdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                               | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                 | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                        | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-slidecqrs-slidegethomelistdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.SlideCQRS.SlideGetHomeListDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                            | Constraints / default | Description                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CmsModule.Application.SlideCQRS.SlideGetHomeListDTO](#schema-cmsmodule-application-slidecqrs-slidegethomelistdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                           | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                             | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                    | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-cmsmodule-application-socialnetworkcqrs-socialnetworkgetlistdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[CmsModule.Application.SocialNetworkCQRS.SocialNetworkGetListDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                                    | Constraints / default | Description                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[CmsModule.Application.SocialNetworkCQRS.SocialNetworkGetListDTO](#schema-cmsmodule-application-socialnetworkcqrs-socialnetworkgetlistdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                                                   | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                                     | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                            | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-financialmodule-application-paygatecqrs-paygatedto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[FinancialModule.Application.PaygateCQRS.PaygateDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                          | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[FinancialModule.Application.PaygateCQRS.PaygateDTO](#schema-financialmodule-application-paygatecqrs-paygatedto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                         | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                           | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                  | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-logisticmodule-application-deliverydatecqrs-supermarketdeliverydatedto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[LogisticModule.Application.DeliveryDateCQRS.SuperMarketDeliveryDateDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                                                  | Constraints / default | Description                                       |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[LogisticModule.Application.DeliveryDateCQRS.SuperMarketDeliveryDateDTO](#schema-logisticmodule-application-deliverydatecqrs-supermarketdeliverydatedto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                                                                 | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                                                   | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                                          | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-notificationmodule-application-adminnoticecqrs-adminnoticegetlistdto--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[NotificationModule.Application.AdminNoticeCQRS.AdminNoticeGetListDTO]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                                              | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<[NotificationModule.Application.AdminNoticeCQRS.AdminNoticeGetListDTO](#schema-notificationmodule-application-adminnoticecqrs-adminnoticegetlistdto)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                                                                                                                                                             | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null                                                                                                                                               | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                                                                                                                                                      | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-collections-generic-list-1-system-int64--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Collections.Generic.List`1[System.Int64]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                         | Constraints / default | Description                                       |
| ----------- | -------- | ------------------------------ | --------------------- | ------------------------------------------------- |
| `value`     | No       | array<integer (int64)> or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                        | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null          | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null                 | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-int32-"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Int32]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                | Constraints / default | Description                                       |
| ----------- | -------- | --------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | integer (int32)       | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean               | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null        | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-int64-"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Int64]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                | Constraints / default | Description                                       |
| ----------- | -------- | --------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | integer (int64)       | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean               | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null        | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-nullable-1-system-int64--"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.Nullable`1[System.Int64]]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                  | Constraints / default | Description                                       |
| ----------- | -------- | ----------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | integer (int64) or null | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean                 | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null   | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null          | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-baseresult-1-system-string-"></a>

### Abstractions.Application.DTOs.BaseResult`1[System.String]

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                | Constraints / default | Description                                       |
| ----------- | -------- | --------------------- | --------------------- | ------------------------------------------------- |
| `value`     | No       | string or null        | —                     | داده بازگشتی در صورت موفق بودن عملیات             |
| `isSuccess` | No       | boolean               | —                     | وضعیت عملیات<br><br>true = موفق<br>false = ناموفق |
| `errors`    | No       | array<string> or null | —                     | پیغام های خطا در صورت ناموفق بودن عملیات          |
| `message`   | No       | string or null        | read-only             | پیغام خطا بصورت یک متن                            |

<a id="schema-abstractions-application-dtos-entitydocumentinfodto"></a>

### Abstractions.Application.DTOs.EntityDocumentInfoDTO

- **Definition:** object
- **Description:** فایلهایی که باید برای یک انتیتی اپلود شوند به همراه <br>فایل های اپلود شده به ازای هر نوع
- **Additional properties:** False

| Property           | Required | Schema                                                                                                            | Constraints / default | Description                                                   |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `mediaFileGroup`   | No       | [Abstractions.Domain.Enums.MediaFileGroup](#schema-abstractions-domain-enums-mediafilegroup)                      | —                     |                                                               |
| `mediaFileGroupFa` | No       | string or null                                                                                                    | read-only             |                                                               |
| `fileTypeId`       | No       | integer (int64)                                                                                                   | —                     |                                                               |
| `titleFa`          | No       | string or null                                                                                                    | —                     | عنوان فارسی<br>مثلا تصویر کارت ملی                            |
| `titleEn`          | No       | string or null                                                                                                    | —                     | عنوان انگلیسی                                                 |
| `allowedFormat`    | No       | array<[Abstractions.Utilities.FileFormat](#schema-abstractions-utilities-fileformat)> or null                     | —                     | فرمت های مجاز                                                 |
| `allowedFormatSt`  | No       | array<string> or null                                                                                             | read-only             |                                                               |
| `maxByteSize`      | No       | integer (int64) or null                                                                                           | —                     |                                                               |
| `description`      | No       | string or null                                                                                                    | —                     | توضیحات                                                       |
| `isRequired`       | No       | boolean                                                                                                           | —                     | فایل اجباری است یا خیر؟                                       |
| `isRepeatable`     | No       | boolean                                                                                                           | —                     | آیا میتوان چند فایل از این نوع در این موجودیت داشت؟           |
| `files`            | No       | array<[Abstractions.Application.DTOs.ModuleFileDTO](#schema-abstractions-application-dtos-modulefiledto)> or null | —                     | فایل های آپلود شده برای این نوع<br>لزوما Gs1 نیست و اسمش غلطه |
| `id`               | No       | integer (int64)                                                                                                   | —                     | شناسه                                                         |

<a id="schema-abstractions-application-dtos-itemgriddto-1-authmodule-application-storecqrs-storegetlistdto-"></a>

### Abstractions.Application.DTOs.ItemGridDTO`1[AuthModule.Application.StoreCQRS.StoreGetListDTO]

- **Definition:** object
- **Description:** گرفتن صفحه بندی جهت نمایش گرید یک موجودیت خاص
- **Additional properties:** False

| Property        | Required | Schema                                                                                                                      | Constraints / default | Description                 |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------------- |
| `page`          | No       | integer (int32)                                                                                                             | —                     | شماره صفحه                  |
| `pageLength`    | No       | integer (int32)                                                                                                             | —                     | تعداد آیتم ها در هر صفحه    |
| `totalCount`    | No       | integer (int32)                                                                                                             | —                     | تعداد کل آیتم ها بدون فیلتر |
| `filteredCount` | No       | integer (int32)                                                                                                             | —                     | تعداد کل آیتم های فیلتر شده |
| `pageCount`     | No       | integer (int32)                                                                                                             | read-only             | تعداد صفحات                 |
| `items`         | No       | array<[AuthModule.Application.StoreCQRS.StoreGetListDTO](#schema-authmodule-application-storecqrs-storegetlistdto)> or null | —                     | لیست آیتم ها                |

<a id="schema-abstractions-application-dtos-lastlogininfodto"></a>

### Abstractions.Application.DTOs.LastLoginInfoDTO

- **Definition:** object
- **Description:** اطلاعات آخرین لاگین کاربر
- **Additional properties:** False

| Property      | Required | Schema             | Constraints / default | Description         |
| ------------- | -------- | ------------------ | --------------------- | ------------------- |
| `ip`          | No       | string or null     | —                     |                     |
| `loginDate`   | No       | string (date-time) | —                     | تاریخ ثبت به میلادی |
| `loginDateFa` | No       | string or null     | read-only             | تاریخ ثبت به شمسی   |

<a id="schema-abstractions-application-dtos-modulefiledto"></a>

### Abstractions.Application.DTOs.ModuleFileDTO

- **Definition:** object
- **Description:** فایل های آپلود شده برای یک انتیتی به ازای یک رکورد مشخص
- **Additional properties:** False

| Property          | Required | Schema                                                                         | Constraints / default | Description              |
| ----------------- | -------- | ------------------------------------------------------------------------------ | --------------------- | ------------------------ |
| `fileId`          | No       | integer (int64)                                                                | —                     | مشخصات فایل              |
| `fileName`        | No       | string or null                                                                 | —                     |                          |
| `fileTypeId`      | No       | integer (int64)                                                                | —                     | نوع فایل                 |
| `fileTypeName`    | No       | string or null                                                                 | —                     |                          |
| `targetId`        | No       | integer (int64)                                                                | —                     | فایل برای چه رکوردی است؟ |
| `fileFormat`      | No       | [Abstractions.Utilities.FileFormat](#schema-abstractions-utilities-fileformat) | —                     |                          |
| `isMain`          | No       | boolean                                                                        | —                     | تصویر اصلی است؟          |
| `fileDescription` | No       | string or null                                                                 | —                     | توضیحات فایل             |
| `streamUrl`       | No       | string or null                                                                 | read-only             | آدرس استریم              |
| `downloadUrl`     | No       | string or null                                                                 | read-only             |                          |
| `id`              | No       | integer (int64)                                                                | —                     | شناسه                    |

<a id="schema-abstractions-application-dtos-selectlistdto"></a>

### Abstractions.Application.DTOs.SelectListDTO

- **Definition:** object
- **Description:** مدل برای دراپدون
- **Additional properties:** False

| Property | Required | Schema          | Constraints / default | Description |
| -------- | -------- | --------------- | --------------------- | ----------- |
| `id`     | No       | integer (int64) | —                     | شناسه       |
| `title`  | No       | string or null  | —                     | عنوان       |

<a id="schema-abstractions-application-dtos-tokenresponsedto"></a>

### Abstractions.Application.DTOs.TokenResponseDTO

- **Definition:** object
- **Additional properties:** False

| Property       | Required | Schema             | Constraints / default | Description |
| -------------- | -------- | ------------------ | --------------------- | ----------- |
| `token`        | No       | string or null     | —                     |             |
| `expireDate`   | No       | string (date-time) | —                     |             |
| `expireDateFa` | No       | string or null     | —                     |             |

<a id="schema-abstractions-application-dtos-uploadfiledto"></a>

### Abstractions.Application.DTOs.UploadFileDTO

- **Definition:** object
- **Additional properties:** False

| Property      | Required | Schema                  | Constraints / default | Description |
| ------------- | -------- | ----------------------- | --------------------- | ----------- |
| `fileTypeId`  | No       | integer (int64)         | —                     |             |
| `file`        | No       | string (binary) or null | —                     |             |
| `description` | No       | string or null          | —                     | اختیاری     |

<a id="schema-abstractions-application-dtos-usertokendto"></a>

### Abstractions.Application.DTOs.UserTokenDTO

- **Definition:** object
- **Description:** مدل اطلاعات کاربر برای افزودن به توکن
- **Additional properties:** False

| Property                | Required | Schema                                                                           | Constraints / default | Description                                                                                                            |
| ----------------------- | -------- | -------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `id`                    | No       | integer (int64)                                                                  | —                     | شناسه کاربر                                                                                                            |
| `name`                  | No       | string or null                                                                   | —                     | نام کاربر                                                                                                              |
| `username`              | No       | string or null                                                                   | —                     | نام کاربری                                                                                                             |
| `type`                  | No       | [Abstractions.Domain.Enums.UserType](#schema-abstractions-domain-enums-usertype) | —                     |                                                                                                                        |
| `superMarketStoreId`    | No       | integer (int64) or null                                                          | —                     | فروشگاه سوپری کاربر.<br>برای ادمین هر دو فروشگاه یکی هستن.<br>برای مشتری با توجه به آدرسش فروشگاه ها متفاوت هستن       |
| `superMarketStoreTitle` | No       | string or null                                                                   | —                     |                                                                                                                        |
| `applianceStoreId`      | No       | integer (int64) or null                                                          | —                     | فروشگاه لوازم خانگی کاربر.<br>برای ادمین هر دو فروشگاه یکی هستن.<br>برای مشتری با توجه به آدرسش فروشگاه ها متفاوت هستن |
| `applianceStoreTitle`   | No       | string or null                                                                   | —                     |                                                                                                                        |
| `passwordIsChanged`     | No       | boolean                                                                          | —                     | عضو کلمه عبور خود را تغییر داده است؟                                                                                   |

<a id="schema-abstractions-domain-enums-deliverytype"></a>

### Abstractions.Domain.Enums.DeliveryType

- **Definition:** integer (int32); enum: `1`, `2`
- **Description:** نوع پیک

**Allowed values:** `1`, `2`

<a id="schema-abstractions-domain-enums-layoutcomponenttype"></a>

### Abstractions.Domain.Enums.LayoutComponentType

- **Definition:** integer (int32); enum: `1`, `2`, `3`, `4`, `5`
- **Description:** نوع کامپوننت لیوت برای نمایش سمت فرانت.<br><br>1 => Banner<br>2 => SingleRowSlider<br>3 => TwoRowGrid<br>4 => Grid2x2<br>5 => Offer

**Allowed values:** `1`, `2`, `3`, `4`, `5`

<a id="schema-abstractions-domain-enums-layoutcontenttype"></a>

### Abstractions.Domain.Enums.LayoutContentType

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `4`, `5`, `6`
- **Description:** نوع محتوای هر سطر در لیوت:<br><br>0 => Category<br>1 => LayoutTag<br>2 => MostDiscount<br>3 => MostSeller<br>4 => MostViewed<br>5 => Offer<br>6 => BannerType

**Allowed values:** `0`, `1`, `2`, `3`, `4`, `5`, `6`

<a id="schema-abstractions-domain-enums-layouttype"></a>

### Abstractions.Domain.Enums.LayoutType

- **Definition:** integer (int32); enum: `1`, `2`
- **Description:** نوع لیوت:<br><br>1 => SuperMarketHomePage<br>2 => ApplianceHomePage

**Allowed values:** `1`, `2`

<a id="schema-abstractions-domain-enums-mediafilegroup"></a>

### Abstractions.Domain.Enums.MediaFileGroup

- **Definition:** integer (int32); enum: `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`
- **Description:** دسته بندی فایل که نشان میدهد فایل برای چه جدولی<br>اپلود شده است. مثلا برای محصولات یا پست ها

**Allowed values:** `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`

<a id="schema-abstractions-domain-enums-platformtype"></a>

### Abstractions.Domain.Enums.PlatformType

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`
- **Description:** نوع پلتفرم کاربر:<br><br>1 => Web<br>2 => Mobile<br>3 => MobileApp

**Allowed values:** `0`, `1`, `2`, `3`

<a id="schema-abstractions-domain-enums-sitetype"></a>

### Abstractions.Domain.Enums.SiteType

- **Definition:** integer (int32); enum: `1`, `2`
- **Description:** نوع محصول یا سایت (سوپر مارکتی / لوازم خانگی)<br><br>1 => SuperMarket<br>2 => Appliance

**Allowed values:** `1`, `2`

<a id="schema-abstractions-domain-enums-usertype"></a>

### Abstractions.Domain.Enums.UserType

- **Definition:** integer (int32); enum: `1`, `2`, `3`, `4`, `5`, `6`
- **Description:** انواع کاربر

**Allowed values:** `1`, `2`, `3`, `4`, `5`, `6`

<a id="schema-abstractions-utilities-fileformat"></a>

### Abstractions.Utilities.FileFormat

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`
- **Description:** 0 = Other (سایر)<br>1 = Image (تصویر)<br>2 = Pdf (پی دی اف)<br>3 = Docx (وُرد)<br>4 = Excel (اکسل)<br>5 = Powerpoint (پاور پوینت)<br>6 = Zip (زیپ)<br>7 = Video (ویدیو)<br>8 = Audio (صوتی)<br>9 = Apk (نرم افزار اندروید)

**Allowed values:** `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`

<a id="schema-authmodule-application-addresscqrs-addresscreatecommand"></a>

### AuthModule.Application.AddressCQRS.AddressCreateCommand

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema          | Constraints / default | Description |
| ------------------- | -------- | --------------- | --------------------- | ----------- |
| `title`             | No       | string or null  | —                     |             |
| `fullAddress`       | No       | string or null  | —                     |             |
| `longitude`         | No       | string or null  | —                     |             |
| `latitude`          | No       | string or null  | —                     |             |
| `plaque`            | No       | string or null  | —                     |             |
| `unit`              | No       | string or null  | —                     |             |
| `postalCode`        | No       | string or null  | —                     |             |
| `hasOtherReceiver`  | No       | boolean         | —                     |             |
| `receiverFirstName` | No       | string or null  | —                     |             |
| `receiverLastName`  | No       | string or null  | —                     |             |
| `receiverPhone`     | No       | string or null  | —                     |             |
| `isDefault`         | No       | boolean         | —                     |             |
| `cityId`            | No       | integer (int64) | —                     |             |

<a id="schema-authmodule-application-addresscqrs-addressgetbyiddto"></a>

### AuthModule.Application.AddressCQRS.AddressGetByIdDTO

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema          | Constraints / default | Description |
| ------------------- | -------- | --------------- | --------------------- | ----------- |
| `customerId`        | No       | integer (int64) | —                     |             |
| `customer`          | No       | string or null  | —                     |             |
| `title`             | No       | string or null  | —                     |             |
| `fullAddress`       | No       | string or null  | —                     |             |
| `longitude`         | No       | string or null  | —                     |             |
| `latitude`          | No       | string or null  | —                     |             |
| `plaque`            | No       | string or null  | —                     |             |
| `unit`              | No       | string or null  | —                     |             |
| `postalCode`        | No       | string or null  | —                     |             |
| `hasOtherReceiver`  | No       | boolean         | —                     |             |
| `receiverFirstName` | No       | string or null  | —                     |             |
| `receiverLastName`  | No       | string or null  | —                     |             |
| `receiverPhone`     | No       | string or null  | —                     |             |
| `isDefault`         | No       | boolean         | —                     |             |
| `cityId`            | No       | integer (int64) | —                     |             |
| `city`              | No       | string or null  | —                     |             |
| `provinceId`        | No       | integer (int64) | —                     |             |
| `provinceTitle`     | No       | string or null  | —                     |             |
| `id`                | No       | integer (int64) | —                     | شناسه       |

<a id="schema-authmodule-application-addresscqrs-addressgetcustomerlistquery"></a>

### AuthModule.Application.AddressCQRS.AddressGetCustomerListQuery

- **Definition:** object
- **Additional properties:** False

<a id="schema-authmodule-application-addresscqrs-addresssetasdefaultcommand"></a>

### AuthModule.Application.AddressCQRS.AddressSetAsDefaultCommand

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema          | Constraints / default | Description |
| ----------- | -------- | --------------- | --------------------- | ----------- |
| `addressId` | No       | integer (int64) | —                     |             |

<a id="schema-authmodule-application-addresscqrs-addressupdatecommand"></a>

### AuthModule.Application.AddressCQRS.AddressUpdateCommand

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema          | Constraints / default | Description |
| ------------------- | -------- | --------------- | --------------------- | ----------- |
| `title`             | No       | string or null  | —                     |             |
| `fullAddress`       | No       | string or null  | —                     |             |
| `longitude`         | No       | string or null  | —                     |             |
| `latitude`          | No       | string or null  | —                     |             |
| `plaque`            | No       | string or null  | —                     |             |
| `unit`              | No       | string or null  | —                     |             |
| `postalCode`        | No       | string or null  | —                     |             |
| `hasOtherReceiver`  | No       | boolean         | —                     |             |
| `receiverFirstName` | No       | string or null  | —                     |             |
| `receiverLastName`  | No       | string or null  | —                     |             |
| `receiverPhone`     | No       | string or null  | —                     |             |
| `isDefault`         | No       | boolean         | —                     |             |
| `cityId`            | No       | integer (int64) | —                     |             |
| `id`                | No       | integer (int64) | —                     | شناسه       |

<a id="schema-authmodule-application-authcqrs-captchadto"></a>

### AuthModule.Application.AuthCQRS.CaptchaDTO

- **Definition:** object
- **Description:** مدل خروجی کپچا
- **Additional properties:** False

| Property | Required | Schema         | Constraints / default | Description                                                                 |
| -------- | -------- | -------------- | --------------------- | --------------------------------------------------------------------------- |
| `img`    | No       | string or null | —                     | تصویر کپچا بصورت بیس 64 بدون پیشوند                                         |
| `cpCode` | No       | string or null | —                     | عبارت کد شده کپچا که باید به همراه مقدار وارد شده توسط کاربر برگشت داده شود |

<a id="schema-authmodule-application-authcqrs-customerlogincommand"></a>

### AuthModule.Application.AuthCQRS.CustomerLoginCommand

- **Definition:** object
- **Additional properties:** False

| Property  | Required | Schema         | Constraints / default | Description |
| --------- | -------- | -------------- | --------------------- | ----------- |
| `mobile`  | No       | string or null | —                     |             |
| `captcha` | No       | string or null | —                     |             |
| `cpCode`  | No       | string or null | —                     |             |

<a id="schema-authmodule-application-authcqrs-customerresendcodecommand"></a>

### AuthModule.Application.AuthCQRS.CustomerResendCodeCommand

- **Definition:** object
- **Additional properties:** False

| Property | Required | Schema         | Constraints / default | Description |
| -------- | -------- | -------------- | --------------------- | ----------- |
| `mobile` | No       | string or null | —                     |             |

<a id="schema-authmodule-application-authcqrs-customerverifycodecommand"></a>

### AuthModule.Application.AuthCQRS.CustomerVerifyCodeCommand

- **Definition:** object
- **Additional properties:** False

| Property | Required | Schema         | Constraints / default | Description |
| -------- | -------- | -------------- | --------------------- | ----------- |
| `mobile` | No       | string or null | —                     |             |
| `code`   | No       | string or null | —                     |             |

<a id="schema-authmodule-application-citycqrs-citysearchdto"></a>

### AuthModule.Application.CityCQRS.CitySearchDTO

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                  | Constraints / default | Description          |
| ----------- | -------- | ----------------------- | --------------------- | -------------------- |
| `title`     | No       | string or null          | —                     |                      |
| `latitude`  | No       | number (double) or null | —                     | عرض جغرافیایی اظهاری |
| `longitude` | No       | number (double) or null | —                     | طول جغرافیایی اظهاری |
| `id`        | No       | integer (int64)         | —                     | شناسه                |

<a id="schema-authmodule-application-contracts-setdefaultstoredto"></a>

### AuthModule.Application.Contracts.SetDefaultStoreDTO

- **Definition:** object
- **Additional properties:** False

| Property      | Required | Schema                                                                                                   | Constraints / default | Description |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `user`        | No       | [Abstractions.Application.DTOs.UserTokenDTO](#schema-abstractions-application-dtos-usertokendto)         | —                     |             |
| `accessToken` | No       | [Abstractions.Application.DTOs.TokenResponseDTO](#schema-abstractions-application-dtos-tokenresponsedto) | —                     |             |

<a id="schema-authmodule-application-customercqrs-customergetbyiddto"></a>

### AuthModule.Application.CustomerCQRS.CustomerGetByIdDTO

- **Definition:** object
- **Additional properties:** False

| Property                | Required | Schema                  | Constraints / default | Description |
| ----------------------- | -------- | ----------------------- | --------------------- | ----------- |
| `firstName`             | No       | string or null          | —                     |             |
| `lastName`              | No       | string or null          | —                     |             |
| `mobile`                | No       | string or null          | —                     |             |
| `nationalCode`          | No       | string or null          | —                     |             |
| `email`                 | No       | string or null          | —                     |             |
| `superMarketStoreId`    | No       | integer (int64) or null | —                     |             |
| `superMarketStoreTitle` | No       | string or null          | —                     |             |
| `applianceStoreId`      | No       | integer (int64) or null | —                     |             |
| `applianceStoreTitle`   | No       | string or null          | —                     |             |
| `isEnabled`             | No       | boolean                 | —                     |             |
| `id`                    | No       | integer (int64)         | —                     | شناسه       |

<a id="schema-authmodule-application-customercqrs-customerupdatecommand"></a>

### AuthModule.Application.CustomerCQRS.CustomerUpdateCommand

- **Definition:** object
- **Additional properties:** False

| Property       | Required | Schema          | Constraints / default | Description |
| -------------- | -------- | --------------- | --------------------- | ----------- |
| `firstName`    | No       | string or null  | —                     |             |
| `lastName`     | No       | string or null  | —                     |             |
| `nationalCode` | No       | string or null  | —                     |             |
| `email`        | No       | string or null  | —                     |             |
| `id`           | No       | integer (int64) | —                     | شناسه       |

<a id="schema-authmodule-application-storecqrs-storegetbyiddto"></a>

### AuthModule.Application.StoreCQRS.StoreGetByIdDTO

- **Definition:** object
- **Additional properties:** False

| Property               | Required | Schema                                                                         | Constraints / default | Description |
| ---------------------- | -------- | ------------------------------------------------------------------------------ | --------------------- | ----------- |
| `title`                | No       | string or null                                                                 | —                     |             |
| `address`              | No       | string or null                                                                 | —                     |             |
| `tel`                  | No       | string or null                                                                 | —                     |             |
| `mobile`               | No       | string or null                                                                 | —                     |             |
| `description`          | No       | string or null                                                                 | —                     |             |
| `latitude`             | No       | number (double) or null                                                        | —                     |             |
| `longitude`            | No       | number (double) or null                                                        | —                     |             |
| `type`                 | No       | [AuthModule.Domain.Enums.StoreType](#schema-authmodule-domain-enums-storetype) | —                     |             |
| `typeFa`               | No       | string or null                                                                 | read-only             |             |
| `apiIp`                | No       | string or null                                                                 | —                     |             |
| `useSnapp`             | No       | boolean                                                                        | —                     |             |
| `snappToken`           | No       | string or null                                                                 | —                     |             |
| `updateInterval`       | No       | integer (int32)                                                                | —                     |             |
| `minOrderPrice`        | No       | integer (int32)                                                                | —                     |             |
| `hasCashPayment`       | No       | boolean                                                                        | —                     |             |
| `hekmatTerminalId`     | No       | string or null                                                                 | —                     |             |
| `hasSuperMarket`       | No       | boolean                                                                        | —                     |             |
| `hasAppliance`         | No       | boolean                                                                        | —                     |             |
| `isSuperMarketDefault` | No       | boolean                                                                        | —                     |             |
| `isApplianceDefault`   | No       | boolean                                                                        | —                     |             |
| `cityId`               | No       | integer (int64) or null                                                        | —                     |             |
| `cityName`             | No       | string or null                                                                 | —                     |             |
| `provinceId`           | No       | integer (int64) or null                                                        | —                     |             |
| `provinceName`         | No       | string or null                                                                 | —                     |             |
| `isEnabled`            | No       | boolean                                                                        | —                     |             |
| `id`                   | No       | integer (int64)                                                                | —                     | شناسه       |

<a id="schema-authmodule-application-storecqrs-storegetlistdto"></a>

### AuthModule.Application.StoreCQRS.StoreGetListDTO

- **Definition:** object
- **Additional properties:** False

| Property               | Required | Schema                                                                         | Constraints / default | Description |
| ---------------------- | -------- | ------------------------------------------------------------------------------ | --------------------- | ----------- |
| `title`                | No       | string or null                                                                 | —                     |             |
| `address`              | No       | string or null                                                                 | —                     |             |
| `tel`                  | No       | string or null                                                                 | —                     |             |
| `mobile`               | No       | string or null                                                                 | —                     |             |
| `description`          | No       | string or null                                                                 | —                     |             |
| `latitude`             | No       | number (double) or null                                                        | —                     |             |
| `longitude`            | No       | number (double) or null                                                        | —                     |             |
| `type`                 | No       | [AuthModule.Domain.Enums.StoreType](#schema-authmodule-domain-enums-storetype) | —                     |             |
| `typeFa`               | No       | string or null                                                                 | read-only             |             |
| `apiIp`                | No       | string or null                                                                 | —                     |             |
| `useSnapp`             | No       | boolean                                                                        | —                     |             |
| `snappToken`           | No       | string or null                                                                 | —                     |             |
| `updateInterval`       | No       | integer (int32)                                                                | —                     |             |
| `minOrderPrice`        | No       | integer (int32)                                                                | —                     |             |
| `hasCashPayment`       | No       | boolean                                                                        | —                     |             |
| `hekmatTerminalId`     | No       | string or null                                                                 | —                     |             |
| `hasSuperMarket`       | No       | boolean                                                                        | —                     |             |
| `hasAppliance`         | No       | boolean                                                                        | —                     |             |
| `isSuperMarketDefault` | No       | boolean                                                                        | —                     |             |
| `isApplianceDefault`   | No       | boolean                                                                        | —                     |             |
| `cityId`               | No       | integer (int64) or null                                                        | —                     |             |
| `cityName`             | No       | string or null                                                                 | —                     |             |
| `isEnabled`            | No       | boolean                                                                        | —                     |             |
| `id`                   | No       | integer (int64)                                                                | —                     | شناسه       |

<a id="schema-authmodule-domain-enums-storetype"></a>

### AuthModule.Domain.Enums.StoreType

- **Definition:** integer (int32); enum: `0`, `1`, `2`
- **Description:** انواع فروشگاه

**Allowed values:** `0`, `1`, `2`

<a id="schema-catalogmodule-application-brandcqrs-brandgethomelistdto"></a>

### CatalogModule.Application.BrandCQRS.BrandGetHomeListDTO

- **Definition:** object
- **Additional properties:** False

| Property | Required | Schema          | Constraints / default | Description |
| -------- | -------- | --------------- | --------------------- | ----------- |
| `title`  | No       | string or null  | —                     |             |
| `order`  | No       | integer (int32) | —                     |             |
| `pic`    | No       | string or null  | —                     |             |
| `picUrl` | No       | string or null  | read-only             |             |
| `id`     | No       | integer (int64) | —                     | شناسه       |

<a id="schema-catalogmodule-application-brandcqrs-brandgethomelistquery"></a>

### CatalogModule.Application.BrandCQRS.BrandGetHomeListQuery

- **Definition:** object
- **Additional properties:** False

<a id="schema-catalogmodule-application-categorycqrs-categorygetdetailsdto"></a>

### CatalogModule.Application.CategoryCQRS.CategoryGetDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                                                                                                            | Constraints / default | Description              |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------ |
| `type`       | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                  | —                     |                          |
| `title`      | No       | string or null                                                                                                    | —                     |                          |
| `parentId`   | No       | integer (int64) or null                                                                                           | —                     |                          |
| `urlTitle`   | No       | string or null                                                                                                    | —                     |                          |
| `metaTitle`  | No       | string or null                                                                                                    | —                     |                          |
| `seoDesc`    | No       | string or null                                                                                                    | —                     |                          |
| `order`      | No       | integer (int32)                                                                                                   | —                     |                          |
| `depth`      | No       | integer (int32)                                                                                                   | —                     |                          |
| `iconName`   | No       | string or null                                                                                                    | —                     |                          |
| `breadcrumb` | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null | —                     |                          |
| `childs`     | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null | —                     | فرزندان مستقیم دسته بندی |
| `id`         | No       | integer (int64)                                                                                                   | —                     | شناسه                    |

<a id="schema-catalogmodule-application-categorycqrs-categorygethometreeviewquery"></a>

### CatalogModule.Application.CategoryCQRS.CategoryGetHomeTreeViewQuery

- **Definition:** object
- **Additional properties:** False

<a id="schema-catalogmodule-application-categorycqrs-productcategorygethometreeviewdto"></a>

### CatalogModule.Application.CategoryCQRS.ProductCategoryGetHomeTreeViewDTO

- **Definition:** object
- **Description:** گرفتن دسته بندی محصولات سایت بصورت درختی
- **Additional properties:** False

| Property        | Required | Schema                                                                                                                                                                      | Constraints / default | Description |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`         | No       | string or null                                                                                                                                                              | —                     |             |
| `parentId`      | No       | integer (int64) or null                                                                                                                                                     | —                     |             |
| `urlTitle`      | No       | string or null                                                                                                                                                              | —                     |             |
| `order`         | No       | integer (int32)                                                                                                                                                             | —                     |             |
| `depth`         | No       | integer (int32)                                                                                                                                                             | —                     |             |
| `iconName`      | No       | string or null                                                                                                                                                              | —                     |             |
| `subCategories` | No       | array<[CatalogModule.Application.CategoryCQRS.ProductCategoryGetHomeTreeViewDTO](#schema-catalogmodule-application-categorycqrs-productcategorygethometreeviewdto)> or null | —                     | زیر دسته ها |
| `id`            | No       | integer (int64)                                                                                                                                                             | —                     | شناسه       |

<a id="schema-catalogmodule-application-favoritecqrs-favoriteaddcommand"></a>

### CatalogModule.Application.FavoriteCQRS.FavoriteAddCommand

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema          | Constraints / default | Description |
| ----------- | -------- | --------------- | --------------------- | ----------- |
| `productId` | No       | integer (int64) | —                     |             |

<a id="schema-catalogmodule-application-favoritecqrs-favoritegetlistdto"></a>

### CatalogModule.Application.FavoriteCQRS.FavoriteGetListDTO

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                                                                                                                                        | Constraints / default | Description      |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------- |
| `page`       | No       | integer (int32)                                                                                                                               | —                     | شماره صفحه       |
| `pageLength` | No       | integer (int32)                                                                                                                               | —                     | تعداد در هر صفحه |
| `pageCount`  | No       | integer (int32)                                                                                                                               | —                     | تعداد صفحات      |
| `totalCount` | No       | integer (int32)                                                                                                                               | —                     | تعداد کل         |
| `products`   | No       | array<[CatalogModule.Application.FavoriteCQRS.FavoriteProductDTO](#schema-catalogmodule-application-favoritecqrs-favoriteproductdto)> or null | —                     | محصول ها         |

<a id="schema-catalogmodule-application-favoritecqrs-favoriteproductdto"></a>

### CatalogModule.Application.FavoriteCQRS.FavoriteProductDTO

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                         | Constraints / default | Description |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `title`     | No       | string or null                                                                                                                 | —                     |             |
| `urlTitle`  | No       | string or null                                                                                                                 | —                     |             |
| `pic`       | No       | string or null                                                                                                                 | —                     |             |
| `picUrl`    | No       | string or null                                                                                                                 | read-only             |             |
| `viewCount` | No       | integer (int32)                                                                                                                | —                     |             |
| `storeInfo` | No       | [CatalogModule.Application.ProductCQRS.StoreProductInfoDTO](#schema-catalogmodule-application-productcqrs-storeproductinfodto) | —                     |             |
| `id`        | No       | integer (int64)                                                                                                                | —                     | شناسه       |

<a id="schema-catalogmodule-application-favoritecqrs-favoriteremovecommand"></a>

### CatalogModule.Application.FavoriteCQRS.FavoriteRemoveCommand

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                         | Constraints / default | Description |
| ------------ | -------- | ------------------------------ | --------------------- | ----------- |
| `productIds` | No       | array<integer (int64)> or null | —                     |             |

<a id="schema-catalogmodule-application-layoutcqrs-layoutgethomelistdto"></a>

### CatalogModule.Application.LayoutCQRS.LayoutGetHomeListDTO

- **Definition:** object
- **Description:** گرفتن لیوت صفحه اصلی
- **Additional properties:** False

| Property          | Required | Schema                                                                                                 | Constraints / default | Description |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `targetType`      | No       | [Abstractions.Domain.Enums.LayoutContentType](#schema-abstractions-domain-enums-layoutcontenttype)     | —                     |             |
| `targetId`        | No       | integer (int64) or null                                                                                | —                     |             |
| `targetTitle`     | No       | string or null                                                                                         | —                     |             |
| `title`           | No       | string or null                                                                                         | read-only             |             |
| `subTitle`        | No       | string or null                                                                                         | —                     |             |
| `urlTitle`        | No       | string or null                                                                                         | —                     |             |
| `componentType`   | No       | [Abstractions.Domain.Enums.LayoutComponentType](#schema-abstractions-domain-enums-layoutcomponenttype) | —                     |             |
| `componentTypeFa` | No       | string or null                                                                                         | read-only             |             |
| `id`              | No       | integer (int64)                                                                                        | —                     | شناسه       |

<a id="schema-catalogmodule-application-patterncqrs-patterndto"></a>

### CatalogModule.Application.PatternCQRS.PatternDTO

- **Definition:** object
- **Additional properties:** False

| Property        | Required | Schema                                                                                                                            | Constraints / default | Description |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `propertyId`    | No       | integer (int64)                                                                                                                   | —                     |             |
| `propertyTitle` | No       | string or null                                                                                                                    | —                     |             |
| `propertyType`  | No       | [CatalogModule.Domain.Enums.PropertyType](#schema-catalogmodule-domain-enums-propertytype)                                        | —                     |             |
| `isColor`       | No       | boolean                                                                                                                           | read-only             |             |
| `values`        | No       | array<[CatalogModule.Application.PatternCQRS.ValueFrontDTO](#schema-catalogmodule-application-patterncqrs-valuefrontdto)> or null | —                     |             |
| `order`         | No       | integer (int32)                                                                                                                   | —                     |             |

<a id="schema-catalogmodule-application-patterncqrs-valuefrontdto"></a>

### CatalogModule.Application.PatternCQRS.ValueFrontDTO

- **Definition:** object
- **Additional properties:** False

| Property      | Required | Schema          | Constraints / default | Description |
| ------------- | -------- | --------------- | --------------------- | ----------- |
| `id`          | No       | integer (int64) | —                     |             |
| `title`       | No       | string or null  | —                     |             |
| `description` | No       | string or null  | —                     |             |

<a id="schema-catalogmodule-application-productcqrs-effectivevaluedto"></a>

### CatalogModule.Application.ProductCQRS.EffectiveValueDTO

- **Definition:** object
- **Additional properties:** False

| Property      | Required | Schema          | Constraints / default | Description                                     |
| ------------- | -------- | --------------- | --------------------- | ----------------------------------------------- |
| `title`       | No       | string or null  | —                     |                                                 |
| `isColor`     | No       | boolean         | —                     | آیا پروپرتی مرتبط با این مقدار، از نوع رنگ است؟ |
| `description` | No       | string or null  | —                     |                                                 |
| `id`          | No       | integer (int64) | —                     | شناسه                                           |

<a id="schema-catalogmodule-application-productcqrs-parentcategoryinfo"></a>

### CatalogModule.Application.ProductCQRS.ParentCategoryInfo

- **Definition:** object
- **Description:** کلاس اطلاعات والد که بصورت لیستی از <br>این کلاس درون یک دسته بندی قرار میگیرد
- **Additional properties:** False

| Property      | Required | Schema          | Constraints / default | Description          |
| ------------- | -------- | --------------- | --------------------- | -------------------- |
| `parentId`    | No       | integer (int64) | —                     | آیدی دسته بندی والد  |
| `parentTitle` | No       | string or null  | —                     | عنوان دسته بندی والد |

<a id="schema-catalogmodule-application-productcqrs-picturedto"></a>

### CatalogModule.Application.ProductCQRS.PictureDTO

- **Definition:** object
- **Description:** مدل برای تصاویر
- **Additional properties:** False

| Property  | Required | Schema         | Constraints / default | Description        |
| --------- | -------- | -------------- | --------------------- | ------------------ |
| `picName` | No       | string or null | —                     | نام تصویر با پسوند |
| `picUrl`  | No       | string or null | read-only             | آدرس تصویر         |
| `isMain`  | No       | boolean        | —                     | تصویر اصلی است؟    |

<a id="schema-catalogmodule-application-productcqrs-productcategorydto"></a>

### CatalogModule.Application.ProductCQRS.ProductCategoryDTO

- **Definition:** object
- **Description:** دسته بندی یک محصول
- **Additional properties:** False

| Property          | Required | Schema                                                                                                                                      | Constraints / default | Description         |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------- |
| `categoryId`      | No       | integer (int64)                                                                                                                             | —                     |                     |
| `categoryTitle`   | No       | string or null                                                                                                                              | —                     |                     |
| `categoryParents` | No       | array<[CatalogModule.Application.ProductCQRS.ParentCategoryInfo](#schema-catalogmodule-application-productcqrs-parentcategoryinfo)> or null | —                     | همه والد های کتگوری |

<a id="schema-catalogmodule-application-productcqrs-productdetailstoreinfodto"></a>

### CatalogModule.Application.ProductCQRS.ProductDetailStoreInfoDTO

- **Definition:** object
- **Description:** قیمت محصول در فروشگاه های مختلف به ازای ویژگی های مختلف
- **Additional properties:** False

| Property              | Required | Schema                     | Constraints / default | Description                                      |
| --------------------- | -------- | -------------------------- | --------------------- | ------------------------------------------------ |
| `storeProductId`      | No       | integer (int64)            | —                     |                                                  |
| `storeId`             | No       | integer (int64) or null    | —                     |                                                  |
| `storeTitle`          | No       | string or null             | —                     |                                                  |
| `mainPrice`           | No       | integer (int64)            | —                     |                                                  |
| `offPrice`            | No       | integer (int64)            | —                     |                                                  |
| `offPercent`          | No       | number (float)             | —                     |                                                  |
| `isOffer`             | No       | boolean                    | —                     |                                                  |
| `offerEndDate`        | No       | string (date-time) or null | —                     |                                                  |
| `offerEndDateFa`      | No       | string or null             | read-only             |                                                  |
| `inventory`           | No       | integer (int32)            | —                     | موجودی انبار                                     |
| `effectiveValueId`    | No       | integer (int64) or null    | —                     | آیدی آیتم انتخاب شده از مشخصه تاثیر گذار در قیمت |
| `effectiveValueTitle` | No       | string or null             | —                     |                                                  |

<a id="schema-catalogmodule-application-productcqrs-producteffectivepropertydto"></a>

### CatalogModule.Application.ProductCQRS.ProductEffectivePropertyDTO

- **Definition:** object
- **Additional properties:** False

| Property        | Required | Schema                                                                                                                                    | Constraints / default | Description                                                                                                          |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `propertyId`    | No       | integer (int64)                                                                                                                           | —                     |                                                                                                                      |
| `propertyTitle` | No       | string or null                                                                                                                            | —                     |                                                                                                                      |
| `isColor`       | No       | boolean                                                                                                                                   | —                     |                                                                                                                      |
| `items`         | No       | array<[CatalogModule.Application.ProductCQRS.EffectiveValueDTO](#schema-catalogmodule-application-productcqrs-effectivevaluedto)> or null | —                     | گزینه هایی از پروپرتی که هنگام افزودن به فروشگاه انتخاب شده اند<br>و هنوز موجودی دارند تا کاربر برای خرید انتخاب کند |

<a id="schema-catalogmodule-application-productcqrs-productfrontdetailsdto"></a>

### CatalogModule.Application.ProductCQRS.ProductFrontDetailsDTO

- **Definition:** object
- **Description:** جزییات یک محصول
- **Additional properties:** False

| Property            | Required | Schema                                                                                                                                                    | Constraints / default | Description                                                              |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------ |
| `productId`         | No       | integer (int64)                                                                                                                                           | —                     | شناسه                                                                    |
| `productInfoId`     | No       | integer (int64)                                                                                                                                           | —                     |                                                                          |
| `type`              | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                                                          | —                     |                                                                          |
| `isHeavyWeight`     | No       | boolean                                                                                                                                                   | —                     | محصول سبک و سنگین برای لوازم خانگی                                       |
| `title`             | No       | string or null                                                                                                                                            | —                     |                                                                          |
| `shortReview`       | No       | string or null                                                                                                                                            | —                     |                                                                          |
| `expertReview`      | No       | string or null                                                                                                                                            | —                     |                                                                          |
| `seoDesc`           | No       | string or null                                                                                                                                            | —                     | توضیح کوتاه در تگ متا برای سئو استفاده میشود                             |
| `metaTitle`         | No       | string or null                                                                                                                                            | —                     | عنوان متا                                                                |
| `weight`            | No       | number (float) or null                                                                                                                                    | —                     | وزن به گرم                                                               |
| `category`          | No       | [CatalogModule.Application.ProductCQRS.ProductCategoryDTO](#schema-catalogmodule-application-productcqrs-productcategorydto)                              | —                     |                                                                          |
| `lastEditDate`      | No       | string (date-time) or null                                                                                                                                | —                     |                                                                          |
| `lastEditor`        | No       | string or null                                                                                                                                            | —                     |                                                                          |
| `storeInfos`        | No       | array<[CatalogModule.Application.ProductCQRS.ProductDetailStoreInfoDTO](#schema-catalogmodule-application-productcqrs-productdetailstoreinfodto)> or null | —                     | اطلاعات قیمتی و فروشنده های کالا                                         |
| `pictures`          | No       | array<[CatalogModule.Application.ProductCQRS.PictureDTO](#schema-catalogmodule-application-productcqrs-picturedto)> or null                               | —                     | تصاویر                                                                   |
| `tags`              | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null                                         | —                     | تگ های کالا                                                              |
| `brand`             | No       | [Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)                                                        | —                     |                                                                          |
| `properties`        | No       | array<[CatalogModule.Application.ProductCQRS.ProductPropertyValueDTO](#schema-catalogmodule-application-productcqrs-productpropertyvaluedto)> or null     | —                     | مشخصات                                                                   |
| `effectiveProperty` | No       | [CatalogModule.Application.ProductCQRS.ProductEffectivePropertyDTO](#schema-catalogmodule-application-productcqrs-producteffectivepropertydto)            | —                     |                                                                          |
| `isExist`           | No       | boolean                                                                                                                                                   | read-only             | موجود است یا نه                                                          |
| `isFavorite`        | No       | boolean                                                                                                                                                   | —                     | در صورت وجود توکن در هدر آیا محصول جزو محصولات مورد علاقه این کاربر است؟ |
| `viewCount`         | No       | integer (int32)                                                                                                                                           | —                     | تعداد بازدید                                                             |

<a id="schema-catalogmodule-application-productcqrs-productfrontsearchquery"></a>

### CatalogModule.Application.ProductCQRS.ProductFrontSearchQuery

- **Definition:** object
- **Additional properties:** False

| Property           | Required | Schema                                                                                                                 | Constraints / default | Description                                                                          |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------ |
| `page`             | No       | integer (int32)                                                                                                        | —                     | شماره صفحه                                                                           |
| `pageLength`       | No       | integer (int32)                                                                                                        | —                     | تعداد کالاها در هر صفحه                                                              |
| `sortType`         | No       | [CatalogModule.Application.ProductCQRS.ProductSortType](#schema-catalogmodule-application-productcqrs-productsorttype) | —                     |                                                                                      |
| `categoryId`       | No       | integer (int64) or null                                                                                                | —                     | آیدی دسته بندی                                                                       |
| `tagId`            | No       | integer (int64) or null                                                                                                | —                     | آیدی تگ                                                                              |
| `layoutTagId`      | No       | integer (int64) or null                                                                                                | —                     | آیدی تگ لیوت                                                                         |
| `brandIds`         | No       | array<integer (int64)> or null                                                                                         | —                     | آیدی برندها                                                                          |
| `minPrice`         | No       | integer (int64) or null                                                                                                | —                     | حداقل مبلغ                                                                           |
| `maxPrice`         | No       | integer (int64) or null                                                                                                | —                     | حداکثر مبلغ                                                                          |
| `searchText`       | No       | string or null                                                                                                         | —                     | متن جستجو                                                                            |
| `justExist`        | No       | boolean                                                                                                                | —                     | فقط کالاهای موجود                                                                    |
| `justOffer`        | No       | boolean                                                                                                                | —                     | فقط کالاهای پیشنهاد ویژه                                                             |
| `justDiscounted`   | No       | boolean                                                                                                                | —                     | فقط کالاهای تخفیف دار                                                                |
| `currentProductId` | No       | integer (int64) or null                                                                                                | —                     | آیدی محصول فعلی<br>موقع گرفتن محصولات مشابه یک محصول نباید خود آن محصول را نشان دهیم |
| `valueIds`         | No       | array<integer (int64)> or null                                                                                         | —                     | آیدی آیتم های پروپرتی های سرچ                                                        |

<a id="schema-catalogmodule-application-productcqrs-productitemdto"></a>

### CatalogModule.Application.ProductCQRS.ProductItemDTO

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                                                    | Constraints / default | Description                             |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------- |
| `title`     | No       | string or null                                                                                                                            | —                     |                                         |
| `urlTitle`  | No       | string or null                                                                                                                            | —                     |                                         |
| `viewCount` | No       | integer (int32)                                                                                                                           | —                     |                                         |
| `pic`       | No       | string or null                                                                                                                            | —                     |                                         |
| `picUrl`    | No       | string or null                                                                                                                            | read-only             |                                         |
| `storeInfo` | No       | [CatalogModule.Application.ProductCQRS.StoreProductInfoDTO](#schema-catalogmodule-application-productcqrs-storeproductinfodto)            | —                     |                                         |
| `varieties` | No       | array<[CatalogModule.Application.ProductCQRS.EffectiveValueDTO](#schema-catalogmodule-application-productcqrs-effectivevaluedto)> or null | —                     | مشخصه های تاثیر گذار در قیمت انتخاب شده |
| `id`        | No       | integer (int64)                                                                                                                           | —                     | شناسه                                   |

<a id="schema-catalogmodule-application-productcqrs-productpropertyvaluedto"></a>

### CatalogModule.Application.ProductCQRS.ProductPropertyValueDTO

- **Definition:** object
- **Description:** مقادیر انتخاب شده برای محصول
- **Additional properties:** False

| Property        | Required | Schema                                                                                                                            | Constraints / default | Description |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `propertyId`    | No       | integer (int64)                                                                                                                   | —                     |             |
| `propertyTitle` | No       | string or null                                                                                                                    | —                     |             |
| `propertyType`  | No       | [CatalogModule.Domain.Enums.PropertyType](#schema-catalogmodule-domain-enums-propertytype)                                        | —                     |             |
| `isColor`       | No       | boolean                                                                                                                           | —                     |             |
| `valueText`     | No       | string or null                                                                                                                    | —                     |             |
| `values`        | No       | array<[CatalogModule.Application.PatternCQRS.ValueFrontDTO](#schema-catalogmodule-application-patterncqrs-valuefrontdto)> or null | —                     |             |

<a id="schema-catalogmodule-application-productcqrs-productsearchbardto"></a>

### CatalogModule.Application.ProductCQRS.ProductSearchbarDTO

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                                                                                                            | Constraints / default | Description  |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ------------ |
| `products`   | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null | —                     | محصولات      |
| `categories` | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null | —                     | دسته بندی ها |
| `brands`     | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null | —                     | برند ها      |

<a id="schema-catalogmodule-application-productcqrs-productsorttype"></a>

### CatalogModule.Application.ProductCQRS.ProductSortType

- **Definition:** integer (int32); enum: `1`, `2`, `3`, `4`, `5`, `6`
- **Description:** نوع مرتب سازی محصولات<br><br>1 => محبوب ترین ها \|<br>2 => پر تخفیف ترین ها \|<br>3 => ارزانترین ها \|<br>4 => گرانترین ها \|<br>5 => پیشنهاد ویژه \|<br>6 => پرفروش ترین ها \|

**Allowed values:** `1`, `2`, `3`, `4`, `5`, `6`

<a id="schema-catalogmodule-application-productcqrs-storeproductinfodto"></a>

### CatalogModule.Application.ProductCQRS.StoreProductInfoDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema                     | Constraints / default | Description |
| ---------------- | -------- | -------------------------- | --------------------- | ----------- |
| `storeProductId` | No       | integer (int64)            | —                     |             |
| `storeId`        | No       | integer (int64) or null    | —                     |             |
| `storeTitle`     | No       | string or null             | —                     |             |
| `mainPrice`      | No       | integer (int64)            | —                     |             |
| `offPrice`       | No       | integer (int64)            | —                     |             |
| `offPercent`     | No       | number (float)             | —                     |             |
| `isOffer`        | No       | boolean                    | —                     |             |
| `offerEndDate`   | No       | string (date-time) or null | —                     |             |
| `offerEndDateFa` | No       | string or null             | read-only             |             |

<a id="schema-catalogmodule-domain-enums-propertytype"></a>

### CatalogModule.Domain.Enums.PropertyType

- **Definition:** integer (int32); enum: `0`, `1`
- **Description:** نوع پروپرتی یا مشخصه

**Allowed values:** `0`, `1`

<a id="schema-cmsmodule-application-advertisementcqrs-advertisementgethomedto"></a>

### CmsModule.Application.AdvertisementCQRS.AdvertisementGetHomeDTO

- **Definition:** object
- **Additional properties:** False

| Property          | Required | Schema                                                                                 | Constraints / default | Description |
| ----------------- | -------- | -------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `text`            | No       | string or null                                                                         | —                     |             |
| `link`            | No       | string or null                                                                         | —                     |             |
| `targetType`      | No       | [CmsModule.Domain.Enums.LinkTargetType](#schema-cmsmodule-domain-enums-linktargettype) | —                     |             |
| `targetTypeFa`    | No       | string or null                                                                         | read-only             |             |
| `targetId`        | No       | integer (int64) or null                                                                | —                     |             |
| `buttonText`      | No       | string or null                                                                         | —                     |             |
| `backgroundColor` | No       | string or null                                                                         | —                     |             |
| `textColor`       | No       | string or null                                                                         | —                     |             |
| `id`              | No       | integer (int64)                                                                        | —                     | شناسه       |

<a id="schema-cmsmodule-application-appversioncqrs-appversioncheckupdatedto"></a>

### CmsModule.Application.AppVersionCQRS.AppVersionCheckUpdateDTO

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema          | Constraints / default | Description |
| ------------------- | -------- | --------------- | --------------------- | ----------- |
| `newVersionIsExist` | No       | boolean         | —                     |             |
| `version`           | No       | string or null  | —                     |             |
| `forceUpdate`       | No       | boolean         | —                     |             |
| `updateLink`        | No       | string or null  | —                     |             |
| `id`                | No       | integer (int64) | —                     | شناسه       |

<a id="schema-cmsmodule-application-appversioncqrs-appversiongetcurrentversiondto"></a>

### CmsModule.Application.AppVersionCQRS.AppVersionGetCurrentVersionDTO

- **Definition:** object
- **Additional properties:** False

| Property      | Required | Schema          | Constraints / default | Description |
| ------------- | -------- | --------------- | --------------------- | ----------- |
| `version`     | No       | string or null  | —                     |             |
| `forceUpdate` | No       | boolean         | —                     |             |
| `id`          | No       | integer (int64) | —                     | شناسه       |

<a id="schema-cmsmodule-application-bannercqrs-bannerdto"></a>

### CmsModule.Application.BannerCQRS.BannerDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema                                                                                 | Constraints / default | Description                              |
| ---------------- | -------- | -------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------- |
| `title`          | No       | string or null                                                                         | —                     |                                          |
| `bannerContent`  | No       | string or null                                                                         | —                     |                                          |
| `width`          | No       | integer (int32)                                                                        | —                     |                                          |
| `height`         | No       | integer (int32)                                                                        | —                     |                                          |
| `order`          | No       | integer (int32)                                                                        | —                     |                                          |
| `link`           | No       | string or null                                                                         | —                     |                                          |
| `targetType`     | No       | [CmsModule.Domain.Enums.LinkTargetType](#schema-cmsmodule-domain-enums-linktargettype) | —                     |                                          |
| `targetId`       | No       | integer (int64) or null                                                                | —                     |                                          |
| `targetUrlTitle` | No       | string or null                                                                         | —                     | ادرس url محصول یا دسته بندی در صورت وجود |
| `bannerTypeId`   | No       | integer (int64) or null                                                                | —                     |                                          |
| `pic`            | No       | string or null                                                                         | —                     |                                          |
| `picUrl`         | No       | string or null                                                                         | read-only             |                                          |
| `id`             | No       | integer (int64)                                                                        | —                     | شناسه                                    |

<a id="schema-cmsmodule-application-categorycqrs-blogcategorygethometreeviewdto"></a>

### CmsModule.Application.CategoryCQRS.BlogCategoryGetHomeTreeViewDTO

- **Definition:** object
- **Description:** گرفتن دسته بندی محصولات سایت بصورت درختی
- **Additional properties:** False

| Property        | Required | Schema                                                                                                                                                        | Constraints / default | Description |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`         | No       | string or null                                                                                                                                                | —                     |             |
| `parentId`      | No       | integer (int64) or null                                                                                                                                       | —                     |             |
| `urlTitle`      | No       | string or null                                                                                                                                                | —                     |             |
| `order`         | No       | integer (int32)                                                                                                                                               | —                     |             |
| `depth`         | No       | integer (int32)                                                                                                                                               | —                     |             |
| `iconName`      | No       | string or null                                                                                                                                                | —                     |             |
| `subCategories` | No       | array<[CmsModule.Application.CategoryCQRS.BlogCategoryGetHomeTreeViewDTO](#schema-cmsmodule-application-categorycqrs-blogcategorygethometreeviewdto)> or null | —                     | زیر دسته ها |
| `id`            | No       | integer (int64)                                                                                                                                               | —                     | شناسه       |

<a id="schema-cmsmodule-application-categorycqrs-blogcategorygethometreeviewquery"></a>

### CmsModule.Application.CategoryCQRS.BlogCategoryGetHomeTreeViewQuery

- **Definition:** object
- **Additional properties:** False

<a id="schema-cmsmodule-application-categorycqrs-categorygetdetailsdto"></a>

### CmsModule.Application.CategoryCQRS.CategoryGetDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                                                                                                                            | Constraints / default | Description |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`      | No       | string or null                                                                                                                    | —                     |             |
| `parentId`   | No       | integer (int64) or null                                                                                                           | —                     |             |
| `urlTitle`   | No       | string or null                                                                                                                    | —                     |             |
| `metaTitle`  | No       | string or null                                                                                                                    | —                     |             |
| `seoDesc`    | No       | string or null                                                                                                                    | —                     |             |
| `order`      | No       | integer (int32)                                                                                                                   | —                     |             |
| `siteType`   | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                                  | —                     |             |
| `siteTypeFa` | No       | string or null                                                                                                                    | read-only             |             |
| `depth`      | No       | integer (int32)                                                                                                                   | —                     |             |
| `iconName`   | No       | string or null                                                                                                                    | —                     |             |
| `catTree`    | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null                 | —                     |             |
| `childs`     | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null                 | —                     |             |
| `files`      | No       | array<[Abstractions.Application.DTOs.EntityDocumentInfoDTO](#schema-abstractions-application-dtos-entitydocumentinfodto)> or null | —                     |             |
| `pic`        | No       | string or null                                                                                                                    | —                     |             |
| `picUrl`     | No       | string or null                                                                                                                    | read-only             |             |
| `id`         | No       | integer (int64)                                                                                                                   | —                     | شناسه       |

<a id="schema-cmsmodule-application-constantcqrs-constantgethomemetatagdto"></a>

### CmsModule.Application.ConstantCQRS.ConstantGetHomeMetaTagDTO

- **Definition:** object
- **Additional properties:** False

| Property              | Required | Schema         | Constraints / default | Description |
| --------------------- | -------- | -------------- | --------------------- | ----------- |
| `homeMetaTitle`       | No       | string or null | —                     |             |
| `homeMetaDescription` | No       | string or null | —                     |             |

<a id="schema-cmsmodule-application-constantcqrs-constantgetsupportinfodto"></a>

### CmsModule.Application.ConstantCQRS.ConstantGetSupportInfoDTO

- **Definition:** object
- **Additional properties:** False

| Property  | Required | Schema         | Constraints / default | Description |
| --------- | -------- | -------------- | --------------------- | ----------- |
| `tel`     | No       | string or null | —                     |             |
| `email`   | No       | string or null | —                     |             |
| `address` | No       | string or null | —                     |             |

<a id="schema-cmsmodule-application-extrapagecqrs-extrapagegetdetailsdto"></a>

### CmsModule.Application.ExtraPageCQRS.ExtraPageGetDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                                                                                                            | Constraints / default | Description |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`     | No       | string or null                                                                                                    | —                     |             |
| `text`      | No       | string or null                                                                                                    | —                     |             |
| `type`      | No       | [CmsModule.Domain.Enums.ExtraPageType](#schema-cmsmodule-domain-enums-extrapagetype)                              | —                     |             |
| `typeFa`    | No       | string or null                                                                                                    | read-only             |             |
| `section`   | No       | [CmsModule.Domain.Enums.ExtraPageSection](#schema-cmsmodule-domain-enums-extrapagesection)                        | —                     |             |
| `sectionFa` | No       | string or null                                                                                                    | read-only             |             |
| `menuTitle` | No       | string or null                                                                                                    | —                     |             |
| `urlTitle`  | No       | string or null                                                                                                    | —                     |             |
| `metaTitle` | No       | string or null                                                                                                    | —                     |             |
| `seoDesc`   | No       | string or null                                                                                                    | —                     |             |
| `isEnabled` | No       | boolean                                                                                                           | —                     |             |
| `files`     | No       | array<[Abstractions.Application.DTOs.ModuleFileDTO](#schema-abstractions-application-dtos-modulefiledto)> or null | —                     |             |
| `id`        | No       | integer (int64)                                                                                                   | —                     | شناسه       |

<a id="schema-cmsmodule-application-extrapagecqrs-extrapagegetmenuitemsdto"></a>

### CmsModule.Application.ExtraPageCQRS.ExtraPageGetMenuItemsDTO

- **Definition:** object
- **Additional properties:** False

| Property      | Required | Schema                                                                                                            | Constraints / default | Description |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `headerItems` | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null | —                     |             |
| `footerItems` | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null | —                     |             |

<a id="schema-cmsmodule-application-faqcqrs-faqgetlistdto"></a>

### CmsModule.Application.FaqCQRS.FaqGetListDTO

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema          | Constraints / default | Description |
| ----------- | -------- | --------------- | --------------------- | ----------- |
| `question`  | No       | string or null  | —                     |             |
| `answer`    | No       | string or null  | —                     |             |
| `order`     | No       | integer (int32) | —                     |             |
| `isEnabled` | No       | boolean         | —                     |             |
| `id`        | No       | integer (int64) | —                     | شناسه       |

<a id="schema-cmsmodule-application-postcqrs-postgetdetailsdto"></a>

### CmsModule.Application.PostCQRS.PostGetDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema                                                                                                            | Constraints / default | Description |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`          | No       | string or null                                                                                                    | —                     |             |
| `summary`        | No       | string or null                                                                                                    | —                     |             |
| `description`    | No       | string or null                                                                                                    | —                     |             |
| `urlTitle`       | No       | string or null                                                                                                    | —                     |             |
| `metaTitle`      | No       | string or null                                                                                                    | —                     |             |
| `seoDesc`        | No       | string or null                                                                                                    | —                     |             |
| `studyTime`      | No       | string or null                                                                                                    | —                     |             |
| `siteType`       | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                  | —                     |             |
| `siteTypeFa`     | No       | string or null                                                                                                    | read-only             |             |
| `isPinned`       | No       | boolean                                                                                                           | —                     |             |
| `pinOrder`       | No       | integer (int32)                                                                                                   | —                     |             |
| `creatorName`    | No       | string or null                                                                                                    | —                     |             |
| `lastEditorName` | No       | string or null                                                                                                    | —                     |             |
| `isEnabled`      | No       | boolean                                                                                                           | —                     |             |
| `tagIds`         | No       | array<integer (int64)> or null                                                                                    | —                     |             |
| `catList`        | No       | array<[Abstractions.Application.DTOs.SelectListDTO](#schema-abstractions-application-dtos-selectlistdto)> or null | —                     |             |
| `pictures`       | No       | array<[Abstractions.Application.DTOs.ModuleFileDTO](#schema-abstractions-application-dtos-modulefiledto)> or null | —                     |             |
| `createDate`     | No       | string (date-time)                                                                                                | —                     |             |
| `commentCount`   | No       | integer (int32)                                                                                                   | —                     |             |
| `createDateFa`   | No       | string or null                                                                                                    | read-only             |             |
| `id`             | No       | integer (int64)                                                                                                   | —                     | شناسه       |

<a id="schema-cmsmodule-application-postcqrs-postgetlistdto"></a>

### CmsModule.Application.PostCQRS.PostGetListDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema                                                                           | Constraints / default | Description |
| ---------------- | -------- | -------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`          | No       | string or null                                                                   | —                     |             |
| `summary`        | No       | string or null                                                                   | —                     |             |
| `description`    | No       | string or null                                                                   | —                     |             |
| `urlTitle`       | No       | string or null                                                                   | —                     |             |
| `metaTitle`      | No       | string or null                                                                   | —                     |             |
| `seoDesc`        | No       | string or null                                                                   | —                     |             |
| `studyTime`      | No       | string or null                                                                   | —                     |             |
| `siteType`       | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype) | —                     |             |
| `siteTypeFa`     | No       | string or null                                                                   | read-only             |             |
| `isPinned`       | No       | boolean                                                                          | —                     |             |
| `pinOrder`       | No       | integer (int32)                                                                  | —                     |             |
| `creatorName`    | No       | string or null                                                                   | —                     |             |
| `lastEditorName` | No       | string or null                                                                   | —                     |             |
| `isEnabled`      | No       | boolean                                                                          | —                     |             |
| `createDate`     | No       | string (date-time)                                                               | —                     |             |
| `createDateFa`   | No       | string or null                                                                   | read-only             |             |
| `pic`            | No       | string or null                                                                   | —                     |             |
| `picUrl`         | No       | string or null                                                                   | read-only             |             |
| `id`             | No       | integer (int64)                                                                  | —                     | شناسه       |

<a id="schema-cmsmodule-application-promotioncqrs-promotiongethomedto"></a>

### CmsModule.Application.PromotionCQRS.PromotionGetHomeDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema                                                                                   | Constraints / default | Description |
| ---------------- | -------- | ---------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`          | No       | string or null                                                                           | —                     |             |
| `link`           | No       | string or null                                                                           | —                     |             |
| `targetType`     | No       | [CmsModule.Domain.Enums.LinkTargetType](#schema-cmsmodule-domain-enums-linktargettype)   | —                     |             |
| `targetTypeFa`   | No       | string or null                                                                           | read-only             |             |
| `targetId`       | No       | integer (int64) or null                                                                  | —                     |             |
| `platformType`   | No       | [Abstractions.Domain.Enums.PlatformType](#schema-abstractions-domain-enums-platformtype) | —                     |             |
| `platformTypeFa` | No       | string or null                                                                           | read-only             |             |
| `isEnabled`      | No       | boolean                                                                                  | —                     |             |
| `pic`            | No       | string or null                                                                           | —                     |             |
| `picUrl`         | No       | string or null                                                                           | read-only             |             |
| `id`             | No       | integer (int64)                                                                          | —                     | شناسه       |

<a id="schema-cmsmodule-application-slidecqrs-slidegethomelistdto"></a>

### CmsModule.Application.SlideCQRS.SlideGetHomeListDTO

- **Definition:** object
- **Additional properties:** False

| Property       | Required | Schema                                                                                 | Constraints / default | Description |
| -------------- | -------- | -------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`        | No       | string or null                                                                         | —                     |             |
| `buttonTitle`  | No       | string or null                                                                         | —                     |             |
| `description`  | No       | string or null                                                                         | —                     |             |
| `order`        | No       | integer (int32)                                                                        | —                     |             |
| `link`         | No       | string or null                                                                         | —                     |             |
| `targetType`   | No       | [CmsModule.Domain.Enums.LinkTargetType](#schema-cmsmodule-domain-enums-linktargettype) | —                     |             |
| `targetTypeFa` | No       | string or null                                                                         | read-only             |             |
| `targetId`     | No       | integer (int64) or null                                                                | —                     |             |
| `pic`          | No       | string or null                                                                         | —                     |             |
| `picUrl`       | No       | string or null                                                                         | read-only             |             |
| `id`           | No       | integer (int64)                                                                        | —                     | شناسه       |

<a id="schema-cmsmodule-application-socialnetworkcqrs-socialnetworkgetlistdto"></a>

### CmsModule.Application.SocialNetworkCQRS.SocialNetworkGetListDTO

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema          | Constraints / default | Description |
| ----------- | -------- | --------------- | --------------------- | ----------- |
| `title`     | No       | string or null  | —                     |             |
| `link`      | No       | string or null  | —                     |             |
| `order`     | No       | integer (int32) | —                     |             |
| `isEnabled` | No       | boolean         | —                     |             |
| `pic`       | No       | string or null  | —                     |             |
| `picUrl`    | No       | string or null  | read-only             |             |
| `id`        | No       | integer (int64) | —                     | شناسه       |

<a id="schema-cmsmodule-domain-enums-bannertype"></a>

### CmsModule.Domain.Enums.BannerType

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `4`
- **Description:** نوع بنر<br>0 => سایر \|<br>1 => بنر های کنار اسلاید \|<br>2 => بنر های بلاگ \|<br>3 => بنر های دسته بندی<br>4 => بنر لاگین

**Allowed values:** `0`, `1`, `2`, `3`, `4`

<a id="schema-cmsmodule-domain-enums-extrapagesection"></a>

### CmsModule.Domain.Enums.ExtraPageSection

- **Definition:** integer (int32); enum: `0`, `1`, `2`
- **Description:** صفحات اضافه در کجا نمایش داده شوند

**Allowed values:** `0`, `1`, `2`

<a id="schema-cmsmodule-domain-enums-extrapagetype"></a>

### CmsModule.Domain.Enums.ExtraPageType

- **Definition:** integer (int32); enum: `0`, `1`, `2`
- **Description:** انواع صفحات داینامیک

**Allowed values:** `0`, `1`, `2`

<a id="schema-cmsmodule-domain-enums-linktargettype"></a>

### CmsModule.Domain.Enums.LinkTargetType

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `4`
- **Description:** نوع هدف اسلاید یا بنر. روی بنر یا اسلاید زدیم کجا بره<br><br>0 => Other<br>1 => Category<br>2 => Tag<br>3 => Product<br>4 => Brand

**Allowed values:** `0`, `1`, `2`, `3`, `4`

<a id="schema-crmmodule-application-commentcqrs-commentcreatecommand"></a>

### CrmModule.Application.CommentCQRS.CommentCreateCommand

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                  | Constraints / default | Description |
| ----------- | -------- | ----------------------- | --------------------- | ----------- |
| `parentId`  | No       | integer (int64) or null | —                     |             |
| `productId` | No       | integer (int64) or null | —                     |             |
| `postId`    | No       | integer (int64) or null | —                     |             |
| `text`      | No       | string or null          | —                     |             |
| `score`     | No       | integer (int32) or null | —                     |             |
| `recommend` | No       | boolean or null         | —                     |             |

<a id="schema-crmmodule-application-commentcqrs-commentdto"></a>

### CrmModule.Application.CommentCQRS.CommentDTO

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema                                                                                                              | Constraints / default | Description    |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------- |
| `productId`         | No       | integer (int64) or null                                                                                             | —                     |                |
| `productTitle`      | No       | string or null                                                                                                      | —                     |                |
| `postId`            | No       | integer (int64) or null                                                                                             | —                     |                |
| `postTitle`         | No       | string or null                                                                                                      | —                     |                |
| `creatorName`       | No       | string or null                                                                                                      | —                     |                |
| `isRead`            | No       | boolean                                                                                                             | —                     |                |
| `isApproved`        | No       | boolean                                                                                                             | —                     |                |
| `text`              | No       | string or null                                                                                                      | —                     |                |
| `score`             | No       | integer (int32) or null                                                                                             | —                     |                |
| `recommend`         | No       | boolean or null                                                                                                     | —                     |                |
| `isBought`          | No       | boolean                                                                                                             | —                     |                |
| `requestIp`         | No       | string or null                                                                                                      | —                     |                |
| `likeCount`         | No       | integer (int32)                                                                                                     | —                     |                |
| `parentId`          | No       | integer (int64) or null                                                                                             | —                     |                |
| `parentCommentText` | No       | string or null                                                                                                      | —                     |                |
| `createDate`        | No       | string (date-time)                                                                                                  | —                     |                |
| `createDateFa`      | No       | string or null                                                                                                      | read-only             |                |
| `userIsLiked`       | No       | boolean                                                                                                             | —                     |                |
| `replies`           | No       | array<[CrmModule.Application.CommentCQRS.CommentDTO](#schema-crmmodule-application-commentcqrs-commentdto)> or null | —                     | پاسخ های کامنت |
| `id`                | No       | integer (int64)                                                                                                     | —                     | شناسه          |

<a id="schema-crmmodule-application-commentcqrs-commentgetfrontdto"></a>

### CrmModule.Application.CommentCQRS.CommentGetFrontDTO

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                                                                                                              | Constraints / default | Description             |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------- |
| `page`       | No       | integer (int32)                                                                                                     | —                     | شماره صفحه              |
| `pageLength` | No       | integer (int32)                                                                                                     | —                     | تعداد کامنت های هر صفحه |
| `pageCount`  | No       | integer (int32)                                                                                                     | —                     | تعداد صفحات             |
| `totalCount` | No       | integer (int32)                                                                                                     | —                     | تعداد کل کامنت ها       |
| `comments`   | No       | array<[CrmModule.Application.CommentCQRS.CommentDTO](#schema-crmmodule-application-commentcqrs-commentdto)> or null | —                     | کامنت ها                |

<a id="schema-crmmodule-application-contactuscqrs-contactuscreatecommand"></a>

### CrmModule.Application.ContactUsCQRS.ContactUsCreateCommand

- **Definition:** object
- **Additional properties:** False

| Property   | Required | Schema         | Constraints / default | Description |
| ---------- | -------- | -------------- | --------------------- | ----------- |
| `fullName` | No       | string or null | —                     |             |
| `email`    | No       | string or null | —                     |             |
| `tel`      | No       | string or null | —                     |             |
| `subject`  | No       | string or null | —                     |             |
| `text`     | No       | string or null | —                     |             |
| `captcha`  | Yes      | string or null | —                     |             |
| `cpCode`   | Yes      | string or null | —                     |             |

<a id="schema-crmmodule-application-ticketcqrs-messagedetailsdto"></a>

### CrmModule.Application.TicketCQRS.MessageDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property       | Required | Schema                                                                                                            | Constraints / default | Description |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `text`         | No       | string or null                                                                                                    | —                     |             |
| `isReaded`     | No       | boolean                                                                                                           | —                     |             |
| `userId`       | No       | integer (int64) or null                                                                                           | —                     |             |
| `user`         | No       | string or null                                                                                                    | —                     |             |
| `fromAdmin`    | No       | boolean                                                                                                           | —                     |             |
| `seenDate`     | No       | string (date-time) or null                                                                                        | —                     |             |
| `seenDateFa`   | No       | string or null                                                                                                    | read-only             |             |
| `createDate`   | No       | string (date-time)                                                                                                | —                     |             |
| `createDateFa` | No       | string or null                                                                                                    | read-only             |             |
| `files`        | No       | array<[Abstractions.Application.DTOs.ModuleFileDTO](#schema-abstractions-application-dtos-modulefiledto)> or null | —                     |             |
| `id`           | No       | integer (int64)                                                                                                   | —                     | شناسه       |

<a id="schema-crmmodule-application-ticketcqrs-ticketdto"></a>

### CrmModule.Application.TicketCQRS.TicketDTO

- **Definition:** object
- **Additional properties:** False

| Property             | Required | Schema                                                                             | Constraints / default | Description |
| -------------------- | -------- | ---------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`              | No       | string or null                                                                     | —                     |             |
| `customerId`         | No       | integer (int64)                                                                    | —                     |             |
| `customer`           | No       | string or null                                                                     | —                     |             |
| `status`             | No       | [CrmModule.Domain.Enums.TicketStatus](#schema-crmmodule-domain-enums-ticketstatus) | —                     |             |
| `statusFa`           | No       | string or null                                                                     | read-only             |             |
| `createDate`         | No       | string (date-time)                                                                 | —                     |             |
| `createDateFa`       | No       | string or null                                                                     | read-only             |             |
| `lastUpdateDate`     | No       | string (date-time) or null                                                         | —                     |             |
| `lastUpdateDateFa`   | No       | string or null                                                                     | read-only             |             |
| `unReadMessageCount` | No       | integer (int32)                                                                    | —                     |             |
| `id`                 | No       | integer (int64)                                                                    | —                     | شناسه       |

<a id="schema-crmmodule-application-ticketcqrs-ticketgetcustomerdto"></a>

### CrmModule.Application.TicketCQRS.TicketGetCustomerDTO

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                                                                                                          | Constraints / default | Description            |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------- |
| `page`       | No       | integer (int32)                                                                                                 | —                     | شماره صفحه             |
| `pageLength` | No       | integer (int32)                                                                                                 | —                     | تعداد تیکت های هر صفحه |
| `pageCount`  | No       | integer (int32)                                                                                                 | —                     | تعداد صفحات            |
| `totalCount` | No       | integer (int32)                                                                                                 | —                     | تعداد کل تیکت ها       |
| `tickets`    | No       | array<[CrmModule.Application.TicketCQRS.TicketDTO](#schema-crmmodule-application-ticketcqrs-ticketdto)> or null | —                     | تیکت ها                |

<a id="schema-crmmodule-application-ticketcqrs-ticketgetdetailsdto"></a>

### CrmModule.Application.TicketCQRS.TicketGetDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property           | Required | Schema                                                                                                                          | Constraints / default | Description |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`            | No       | string or null                                                                                                                  | —                     |             |
| `customerId`       | No       | integer (int64)                                                                                                                 | —                     |             |
| `customer`         | No       | string or null                                                                                                                  | —                     |             |
| `status`           | No       | [CrmModule.Domain.Enums.TicketStatus](#schema-crmmodule-domain-enums-ticketstatus)                                              | —                     |             |
| `statusFa`         | No       | string or null                                                                                                                  | read-only             |             |
| `createDate`       | No       | string (date-time)                                                                                                              | —                     |             |
| `createDateFa`     | No       | string or null                                                                                                                  | read-only             |             |
| `lastUpdateDate`   | No       | string (date-time) or null                                                                                                      | —                     |             |
| `lastUpdateDateFa` | No       | string or null                                                                                                                  | read-only             |             |
| `messages`         | No       | array<[CrmModule.Application.TicketCQRS.MessageDetailsDTO](#schema-crmmodule-application-ticketcqrs-messagedetailsdto)> or null | —                     |             |
| `id`               | No       | integer (int64)                                                                                                                 | —                     | شناسه       |

<a id="schema-crmmodule-domain-enums-commentsorttype"></a>

### CrmModule.Domain.Enums.CommentSortType

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`
- **Description:** 0 = Newest (جدیدترین)<br>1 = Oldest (قدیمی ترین)<br>2 = MostScore (بیشترین امتیاز)<br>3 = LowestScore (کمترین امتیاز)

**Allowed values:** `0`, `1`, `2`, `3`

<a id="schema-crmmodule-domain-enums-ticketstatus"></a>

### CrmModule.Domain.Enums.TicketStatus

- **Definition:** integer (int32); enum: `0`, `1`, `2`
- **Description:** 0 = Open (در انتظار پاسخ)<br>1 = Answered (پاسخ داده شده)<br>2 = Closed (بسته شده)

**Allowed values:** `0`, `1`, `2`

<a id="schema-financialmodule-application-paygatecqrs-paygatedto"></a>

### FinancialModule.Application.PaygateCQRS.PaygateDTO

- **Definition:** object
- **Description:** اطلاعات درگاه پرداخت
- **Additional properties:** False

| Property        | Required | Schema          | Constraints / default | Description      |
| --------------- | -------- | --------------- | --------------------- | ---------------- |
| `id`            | No       | integer (int64) | —                     | شناسه            |
| `title`         | No       | string or null  | —                     | عنوان            |
| `pic`           | No       | string or null  | —                     | تصویر            |
| `picUrl`        | No       | string or null  | read-only             |                  |
| `order`         | No       | integer (int32) | —                     |                  |
| `isInstallment` | No       | boolean         | —                     | پرداخت قسطی است؟ |

<a id="schema-financialmodule-application-paymentcqrs-paymentgetcustomerlistdto"></a>

### FinancialModule.Application.PaymentCQRS.PaymentGetCustomerListDTO

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                                                                                                                                        | Constraints / default | Description              |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------ |
| `page`       | No       | integer (int32)                                                                                                                               | —                     | شماره صفحه               |
| `pageLength` | No       | integer (int32)                                                                                                                               | —                     | تعداد پرداخت های هر صفحه |
| `pageCount`  | No       | integer (int32)                                                                                                                               | —                     | تعداد صفحات              |
| `totalCount` | No       | integer (int32)                                                                                                                               | —                     | تعداد کل پرداخت ها       |
| `payments`   | No       | array<[FinancialModule.Application.PaymentCQRS.PaymentGetListDTO](#schema-financialmodule-application-paymentcqrs-paymentgetlistdto)> or null | —                     | پرداخت ها                |

<a id="schema-financialmodule-application-paymentcqrs-paymentgetlistdto"></a>

### FinancialModule.Application.PaymentCQRS.PaymentGetListDTO

- **Definition:** object
- **Additional properties:** False

| Property           | Required | Schema                  | Constraints / default | Description |
| ------------------ | -------- | ----------------------- | --------------------- | ----------- |
| `customerId`       | No       | integer (int64)         | —                     |             |
| `customerName`     | No       | string or null          | —                     |             |
| `factorId`         | No       | integer (int64) or null | —                     |             |
| `factorNumber`     | No       | string or null          | —                     |             |
| `amount`           | No       | integer (int64)         | —                     |             |
| `refNum`           | No       | string or null          | —                     |             |
| `traceNum`         | No       | string or null          | —                     |             |
| `cardNumber`       | No       | string or null          | —                     |             |
| `status`           | No       | string or null          | —                     |             |
| `message`          | No       | string or null          | —                     |             |
| `isPaid`           | No       | boolean or null         | —                     |             |
| `installmentCount` | No       | integer (int32) or null | —                     |             |
| `paygateId`        | No       | integer (int64) or null | —                     |             |
| `paygate`          | No       | string or null          | —                     |             |
| `createDate`       | No       | string (date-time)      | —                     |             |
| `createDateFa`     | No       | string or null          | read-only             |             |
| `id`               | No       | integer (int64)         | —                     | شناسه       |

<a id="schema-logisticmodule-application-deliverydatecqrs-appliancealldeliverydatedto"></a>

### LogisticModule.Application.DeliveryDateCQRS.ApplianceAllDeliveryDateDTO

- **Definition:** object
- **Additional properties:** False

| Property                   | Required | Schema                                                                                                                                                              | Constraints / default | Description                  |
| -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------- |
| `heavyWeightDeliveryDates` | No       | array<[LogisticModule.Application.DeliveryDateCQRS.ApplianceDeliveryDateDTO](#schema-logisticmodule-application-deliverydatecqrs-appliancedeliverydatedto)> or null | —                     | زمانبندی های ارسال سنگین وزن |
| `lightWeightDeliveryDates` | No       | array<[LogisticModule.Application.DeliveryDateCQRS.ApplianceDeliveryDateDTO](#schema-logisticmodule-application-deliverydatecqrs-appliancedeliverydatedto)> or null | —                     | زمانبندی های ارسال سبک وزن   |

<a id="schema-logisticmodule-application-deliverydatecqrs-appliancedeliverydatedto"></a>

### LogisticModule.Application.DeliveryDateCQRS.ApplianceDeliveryDateDTO

- **Definition:** object
- **Additional properties:** False

| Property        | Required | Schema                                                                                                                                                              | Constraints / default | Description |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`         | No       | string or null                                                                                                                                                      | —                     |             |
| `year`          | No       | integer (int32)                                                                                                                                                     | —                     |             |
| `month`         | No       | integer (int32)                                                                                                                                                     | —                     |             |
| `deliveryTimes` | No       | array<[LogisticModule.Application.DeliveryDateCQRS.ApplianceDeliveryTimeDTO](#schema-logisticmodule-application-deliverydatecqrs-appliancedeliverytimedto)> or null | —                     |             |

<a id="schema-logisticmodule-application-deliverydatecqrs-appliancedeliverytimedto"></a>

### LogisticModule.Application.DeliveryDateCQRS.ApplianceDeliveryTimeDTO

- **Definition:** object
- **Additional properties:** False

| Property          | Required | Schema          | Constraints / default | Description      |
| ----------------- | -------- | --------------- | --------------------- | ---------------- |
| `title`           | No       | string or null  | —                     |                  |
| `startDayOfMonth` | No       | integer (int32) | —                     |                  |
| `endDayOfMonth`   | No       | integer (int32) | —                     |                  |
| `isFull`          | No       | boolean         | —                     | ظرفیت تکمیل است؟ |
| `id`              | No       | integer (int64) | —                     | شناسه            |

<a id="schema-logisticmodule-application-deliverydatecqrs-supermarketdeliverydatedto"></a>

### LogisticModule.Application.DeliveryDateCQRS.SuperMarketDeliveryDateDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema                                                                                                                                                                  | Constraints / default | Description |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `deliveryDate`   | No       | string (date-time)                                                                                                                                                      | —                     |             |
| `deliveryDateFa` | No       | string or null                                                                                                                                                          | read-only             |             |
| `deliveryTimes`  | No       | array<[LogisticModule.Application.DeliveryDateCQRS.SuperMarketDeliveryTimeDTO](#schema-logisticmodule-application-deliverydatecqrs-supermarketdeliverytimedto)> or null | —                     |             |

<a id="schema-logisticmodule-application-deliverydatecqrs-supermarketdeliverytimedto"></a>

### LogisticModule.Application.DeliveryDateCQRS.SuperMarketDeliveryTimeDTO

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema          | Constraints / default | Description      |
| ----------- | -------- | --------------- | --------------------- | ---------------- |
| `title`     | No       | string or null  | —                     |                  |
| `startTime` | No       | string or null  | —                     |                  |
| `endTime`   | No       | string or null  | —                     |                  |
| `isFull`    | No       | boolean         | —                     | ظرفیت تکمیل است؟ |
| `id`        | No       | integer (int64) | —                     | شناسه            |

<a id="schema-logisticmodule-application-deliverytimecqrs-setappliancebasketdeliverytimecommand"></a>

### LogisticModule.Application.DeliveryTimeCQRS.SetApplianceBasketDeliveryTimeCommand

- **Definition:** object
- **Additional properties:** False

| Property                  | Required | Schema                                                                                                                                                     | Constraints / default | Description |
| ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `basketId`                | No       | integer (int64)                                                                                                                                            | —                     |             |
| `heavyWeightDeliveryTime` | No       | [LogisticModule.Application.DeliveryTimeCQRS.SetApplianceDeliveryTimeDTO](#schema-logisticmodule-application-deliverytimecqrs-setappliancedeliverytimedto) | —                     |             |
| `lightWeightDeliveryTime` | No       | [LogisticModule.Application.DeliveryTimeCQRS.SetApplianceDeliveryTimeDTO](#schema-logisticmodule-application-deliverytimecqrs-setappliancedeliverytimedto) | —                     |             |

<a id="schema-logisticmodule-application-deliverytimecqrs-setappliancedeliverytimedto"></a>

### LogisticModule.Application.DeliveryTimeCQRS.SetApplianceDeliveryTimeDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema          | Constraints / default | Description |
| ---------------- | -------- | --------------- | --------------------- | ----------- |
| `year`           | No       | integer (int32) | —                     |             |
| `month`          | No       | integer (int32) | —                     |             |
| `deliveryTimeId` | No       | integer (int64) | —                     |             |

<a id="schema-logisticmodule-application-deliverytimecqrs-setsupermarketbasketdeliverytimecommand"></a>

### LogisticModule.Application.DeliveryTimeCQRS.SetSuperMarketBasketDeliveryTimeCommand

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema             | Constraints / default | Description |
| ---------------- | -------- | ------------------ | --------------------- | ----------- |
| `basketId`       | No       | integer (int64)    | —                     |             |
| `deliveryDate`   | No       | string (date-time) | —                     |             |
| `deliveryTimeId` | No       | integer (int64)    | —                     |             |

<a id="schema-logmodule-application-loginlogcqrs-loginloggetcustomerlistdto"></a>

### LogModule.Application.LoginLogCQRS.LoginLogGetCustomerListDTO

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                                                                                                                                | Constraints / default | Description           |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------- |
| `page`       | No       | integer (int32)                                                                                                                       | —                     | شماره صفحه            |
| `pageLength` | No       | integer (int32)                                                                                                                       | —                     | تعداد لاگ های هر صفحه |
| `pageCount`  | No       | integer (int32)                                                                                                                       | —                     | تعداد صفحات           |
| `totalCount` | No       | integer (int32)                                                                                                                       | —                     | تعداد کل لاگ ها       |
| `logs`       | No       | array<[LogModule.Application.LoginLogCQRS.LoginLogGetListDTO](#schema-logmodule-application-loginlogcqrs-loginloggetlistdto)> or null | —                     | لاگ ها                |

<a id="schema-logmodule-application-loginlogcqrs-loginloggetlistdto"></a>

### LogModule.Application.LoginLogCQRS.LoginLogGetListDTO

- **Definition:** object
- **Additional properties:** False

| Property       | Required | Schema                  | Constraints / default | Description |
| -------------- | -------- | ----------------------- | --------------------- | ----------- |
| `username`     | No       | string or null          | —                     |             |
| `userId`       | No       | integer (int64) or null | —                     |             |
| `userFullName` | No       | string or null          | —                     |             |
| `userType`     | No       | string or null          | —                     |             |
| `authLevel`    | No       | string or null          | —                     |             |
| `ip`           | No       | string or null          | —                     |             |
| `isSuccess`    | No       | boolean                 | —                     |             |
| `description`  | No       | string or null          | —                     |             |
| `createDate`   | No       | string (date-time)      | —                     |             |
| `createDateFa` | No       | string or null          | read-only             |             |
| `id`           | No       | integer (int64)         | —                     | شناسه       |

<a id="schema-notificationmodule-application-adminnoticecqrs-adminnoticegetlistdto"></a>

### NotificationModule.Application.AdminNoticeCQRS.AdminNoticeGetListDTO

- **Definition:** object
- **Additional properties:** False

| Property          | Required | Schema                     | Constraints / default | Description |
| ----------------- | -------- | -------------------------- | --------------------- | ----------- |
| `title`           | No       | string or null             | —                     |             |
| `text`            | No       | string or null             | —                     |             |
| `showStartDate`   | No       | string (date-time) or null | —                     |             |
| `showStartDateFa` | No       | string or null             | read-only             |             |
| `showEndDate`     | No       | string (date-time) or null | —                     |             |
| `showEndDateFa`   | No       | string or null             | read-only             |             |
| `isPublic`        | No       | boolean                    | —                     |             |
| `sendSms`         | No       | boolean                    | —                     |             |
| `customerId`      | No       | integer (int64) or null    | —                     |             |
| `customerName`    | No       | string or null             | —                     |             |
| `isEnabled`       | No       | boolean                    | —                     |             |
| `id`              | No       | integer (int64)            | —                     | شناسه       |

<a id="schema-orderingmodule-application-basketcqrs-basketadditemcommand"></a>

### OrderingModule.Application.BasketCQRS.BasketAddItemCommand

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema          | Constraints / default | Description |
| ---------------- | -------- | --------------- | --------------------- | ----------- |
| `storeProductId` | No       | integer (int64) | —                     |             |
| `quantity`       | No       | integer (int32) | —                     |             |

<a id="schema-orderingmodule-application-basketcqrs-basketcheckdiscountcommand"></a>

### OrderingModule.Application.BasketCQRS.BasketCheckDiscountCommand

- **Definition:** object
- **Additional properties:** False

| Property   | Required | Schema          | Constraints / default | Description |
| ---------- | -------- | --------------- | --------------------- | ----------- |
| `basketId` | No       | integer (int64) | —                     |             |
| `code`     | No       | string or null  | —                     |             |

<a id="schema-orderingmodule-application-basketcqrs-basketcheckoutdetailsdto"></a>

### OrderingModule.Application.BasketCQRS.BasketCheckoutDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property                | Required | Schema                                                                                                                                                | Constraints / default | Description                               |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------- |
| `type`                  | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                                                      | —                     |                                           |
| `storeId`               | No       | integer (int64)                                                                                                                                       | —                     |                                           |
| `storeTitle`            | No       | string or null                                                                                                                                        | —                     |                                           |
| `count`                 | No       | integer (int32)                                                                                                                                       | —                     |                                           |
| `totalMainPrice`        | No       | integer (int64)                                                                                                                                       | —                     | ارزش سبد با توجه به قیمت خریدار           |
| `totalOffPrice`         | No       | integer (int64)                                                                                                                                       | —                     | ارزش سبد با احتساب قیمت فروش اتکا         |
| `offDiscountAmount`     | No       | integer (int64)                                                                                                                                       | —                     | میزان کل تخفیف عمومی اتکا                 |
| `discountCode`          | No       | string or null                                                                                                                                        | —                     | کد تخفیف                                  |
| `discountAmount`        | No       | integer (int64)                                                                                                                                       | —                     | مبلغ تخفیف درون سایتی                     |
| `hekmatDiscountAmount`  | No       | integer (int64)                                                                                                                                       | —                     | مبلغ تخفیف حکمت روی همین سبد خرید         |
| `hekmatBonAmount`       | No       | integer (int64)                                                                                                                                       | —                     |                                           |
| `hekmatSubsidAmount`    | No       | integer (int64)                                                                                                                                       | —                     |                                           |
| `hekmatBuyCreditAmount` | No       | integer (int64)                                                                                                                                       | —                     | مجموع اعتبار ریالی حکمت                   |
| `deliveryAmount`        | No       | integer (int64)                                                                                                                                       | —                     | هزینه تحویل                               |
| `payableAmount`         | No       | integer (int64)                                                                                                                                       | read-only             | مبلغ قابل پرداخت                          |
| `hekmatIsPaid`          | No       | boolean                                                                                                                                               | —                     | آیا بخش حکمت پرداخت شده است؟              |
| `deliveryStartDate`     | No       | string (date-time) or null                                                                                                                            | —                     | آغاز بازه زمانبندی ارسال سفارش به میلادی  |
| `deliveryEndDate`       | No       | string (date-time) or null                                                                                                                            | —                     | پایان بازه زمانبندی ارسال سفارش به میلادی |
| `deliveryTime`          | No       | string or null                                                                                                                                        | read-only             | زمانبندی ارسال سفارش به شمسی              |
| `basketItems`           | No       | array<[OrderingModule.Application.BasketCQRS.OpenBasketItemSimpleDTO](#schema-orderingmodule-application-basketcqrs-openbasketitemsimpledto)> or null | —                     | کالاهای درون سبد                          |
| `id`                    | No       | integer (int64)                                                                                                                                       | —                     | شناسه                                     |

<a id="schema-orderingmodule-application-basketcqrs-basketcommitcommand"></a>

### OrderingModule.Application.BasketCQRS.BasketCommitCommand

- **Definition:** object
- **Description:** ذخیره سبد خرید تو مرحله اول تایید نهایی سبد خرید
- **Additional properties:** False

| Property              | Required | Schema          | Constraints / default | Description |
| --------------------- | -------- | --------------- | --------------------- | ----------- |
| `basketId`            | No       | integer (int64) | —                     |             |
| `customerDescription` | No       | string or null  | —                     |             |

<a id="schema-orderingmodule-application-basketcqrs-basketcommitresponsedto"></a>

### OrderingModule.Application.BasketCQRS.BasketCommitResponseDTO

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema          | Constraints / default | Description                                                                                |
| ------------------- | -------- | --------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| `totalMainPrice`    | No       | integer (int64) | —                     | مجموع ارزش کالاها بدون در نظر گرفتن تخفیف و آف<br>و متناسب با قیمت مصرف کننده              |
| `totalOffPrice`     | No       | integer (int64) | —                     | مبلغ سفارش با احتساب تخفیف و قیمت فروش اتکا                                                |
| `offDiscountAmount` | No       | integer (int64) | —                     | مجموع تخفیف عمومی اتکا که روی جنس ها آف میزنه<br>اختلاف بین TotalMainPrice و TotalOffPrice |
| `discountAmount`    | No       | integer (int64) | —                     | تخفیف گرفته شده با کد تخفیف سایت                                                           |
| `deliveryAmount`    | No       | integer (int64) | —                     |                                                                                            |
| `serviceAmount`     | No       | integer (int64) | —                     |                                                                                            |
| `id`                | No       | integer (int64) | —                     | شناسه                                                                                      |

<a id="schema-orderingmodule-application-basketcqrs-basketpaycommand"></a>

### OrderingModule.Application.BasketCQRS.BasketPayCommand

- **Definition:** object
- **Description:** ذخیره سبد خرید و رفتن به درگاه پرداخت
- **Additional properties:** False

| Property           | Required | Schema                                                                                         | Constraints / default | Description |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `basketId`         | No       | integer (int64)                                                                                | —                     |             |
| `payType`          | No       | [OrderingModule.Domain.Enums.BasketPayType](#schema-orderingmodule-domain-enums-basketpaytype) | —                     |             |
| `paygateId`        | No       | integer (int64) or null                                                                        | —                     |             |
| `installmentCount` | No       | integer (int32) or null                                                                        | —                     |             |
| `callbackUrl`      | No       | string or null                                                                                 | —                     |             |

<a id="schema-orderingmodule-application-basketcqrs-basketpayresponsedto"></a>

### OrderingModule.Application.BasketCQRS.BasketPayResponseDTO

- **Definition:** object
- **Additional properties:** False

| Property       | Required | Schema          | Constraints / default | Description                                    |
| -------------- | -------- | --------------- | --------------------- | ---------------------------------------------- |
| `basketId`     | No       | integer (int64) | —                     | آیدی سبد                                       |
| `isPaid`       | No       | boolean         | —                     | سبد خرید با اعتبار حکمت پرداخت شده است یا خیر؟ |
| `needPayGate`  | No       | boolean         | —                     | نیاز به درگاه پرداخت دارد؟                     |
| `payUrl`       | No       | string or null  | —                     | آدرس پرداخت                                    |
| `message`      | No       | string or null  | —                     | پیغام مناسب                                    |
| `factorNumber` | No       | string or null  | —                     | شماره سفارش                                    |
| `deliveryCode` | No       | string or null  | —                     | کد تحویل                                       |

<a id="schema-orderingmodule-application-basketcqrs-basketremoveitemcommand"></a>

### OrderingModule.Application.BasketCQRS.BasketRemoveItemCommand

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema          | Constraints / default | Description |
| ---------------- | -------- | --------------- | --------------------- | ----------- |
| `storeProductId` | No       | integer (int64) | —                     |             |
| `basketId`       | No       | integer (int64) | —                     |             |

<a id="schema-orderingmodule-application-basketcqrs-basketupdateitemcommand"></a>

### OrderingModule.Application.BasketCQRS.BasketUpdateItemCommand

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema          | Constraints / default | Description |
| ---------------- | -------- | --------------- | --------------------- | ----------- |
| `storeProductId` | No       | integer (int64) | —                     |             |
| `quantity`       | No       | integer (int32) | —                     |             |
| `basketId`       | No       | integer (int64) | —                     |             |

<a id="schema-orderingmodule-application-basketcqrs-openbasketitemsimpledto"></a>

### OrderingModule.Application.BasketCQRS.OpenBasketItemSimpleDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema                  | Constraints / default | Description |
| ---------------- | -------- | ----------------------- | --------------------- | ----------- |
| `storeProductId` | No       | integer (int64)         | —                     |             |
| `productId`      | No       | integer (int64)         | —                     |             |
| `productTitle`   | No       | string or null          | —                     |             |
| `barcode`        | No       | string or null          | —                     |             |
| `isHeavyWeight`  | No       | boolean                 | —                     |             |
| `propertyId`     | No       | integer (int64) or null | —                     |             |
| `propertyTitle`  | No       | string or null          | —                     |             |
| `valueId`        | No       | integer (int64) or null | —                     |             |
| `valueTitle`     | No       | string or null          | —                     |             |
| `mainPrice`      | No       | integer (int64)         | —                     |             |
| `offPrice`       | No       | integer (int64)         | —                     |             |
| `offPercent`     | No       | number (float)          | —                     |             |
| `productCount`   | No       | integer (int32)         | —                     |             |
| `inventory`      | No       | integer (int32)         | —                     |             |
| `hasInventory`   | No       | boolean                 | read-only             |             |
| `taxPercent`     | No       | number (float)          | —                     |             |
| `taxAmount`      | No       | number (double)         | —                     |             |
| `pic`            | No       | string or null          | —                     |             |
| `picUrl`         | No       | string or null          | read-only             |             |
| `id`             | No       | integer (int64)         | —                     | شناسه       |

<a id="schema-orderingmodule-application-basketcqrs-openbasketsimpledto"></a>

### OrderingModule.Application.BasketCQRS.OpenBasketSimpleDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema                                                                                                                                                | Constraints / default | Description                      |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------- |
| `customerId`     | No       | integer (int64) or null                                                                                                                               | —                     |                                  |
| `customerName`   | No       | string or null                                                                                                                                        | —                     |                                  |
| `storeId`        | No       | integer (int64)                                                                                                                                       | —                     |                                  |
| `storeTitle`     | No       | string or null                                                                                                                                        | —                     |                                  |
| `productCount`   | No       | integer (int32)                                                                                                                                       | read-only             | تعداد محصولات درون سبد           |
| `itemCount`      | No       | integer (int32)                                                                                                                                       | read-only             | تعداد تنوع محصولات درون سبد      |
| `totalMainPrice` | No       | integer (int64)                                                                                                                                       | read-only             | ارزش سبد با توجه به قیمت اصلی    |
| `totalOffPrice`  | No       | integer (int64)                                                                                                                                       | read-only             | ارزش سبد با احتساب قیمت با تخفیف |
| `basketItems`    | No       | array<[OrderingModule.Application.BasketCQRS.OpenBasketItemSimpleDTO](#schema-orderingmodule-application-basketcqrs-openbasketitemsimpledto)> or null | —                     | کالاهای درون سبد                 |
| `id`             | No       | integer (int64)                                                                                                                                       | —                     | شناسه                            |

<a id="schema-orderingmodule-application-dtos-basketitemdto"></a>

### OrderingModule.Application.DTOs.BasketItemDTO

- **Definition:** object
- **Additional properties:** False

| Property                | Required | Schema                                                                                                                 | Constraints / default | Description |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `storeProductId`        | No       | integer (int64)                                                                                                        | —                     |             |
| `productId`             | No       | integer (int64)                                                                                                        | —                     |             |
| `productTitle`          | No       | string or null                                                                                                         | —                     |             |
| `barcode`               | No       | string or null                                                                                                         | —                     |             |
| `inventory`             | No       | integer (int32)                                                                                                        | —                     |             |
| `productType`           | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                       | —                     |             |
| `productTypeFa`         | No       | string or null                                                                                                         | read-only             |             |
| `isHeavyWeight`         | No       | boolean                                                                                                                | —                     |             |
| `propertyId`            | No       | integer (int64) or null                                                                                                | —                     |             |
| `propertyTitle`         | No       | string or null                                                                                                         | —                     |             |
| `valueId`               | No       | integer (int64) or null                                                                                                | —                     |             |
| `valueTitle`            | No       | string or null                                                                                                         | —                     |             |
| `mainPrice`             | No       | integer (int64)                                                                                                        | —                     |             |
| `offPrice`              | No       | integer (int64)                                                                                                        | —                     |             |
| `currentPrice`          | No       | integer (int64)                                                                                                        | —                     |             |
| `productCount`          | No       | integer (int32)                                                                                                        | —                     |             |
| `hekmatDiscountAmount`  | No       | integer (int64)                                                                                                        | —                     |             |
| `hekmatDiscountPercent` | No       | number (float)                                                                                                         | —                     |             |
| `taxPercent`            | No       | number (float)                                                                                                         | —                     |             |
| `taxAmount`             | No       | number (double)                                                                                                        | —                     |             |
| `tollPercent`           | No       | number (float)                                                                                                         | —                     |             |
| `tollAmount`            | No       | number (double)                                                                                                        | —                     |             |
| `eifaDiscountId`        | No       | string or null                                                                                                         | —                     |             |
| `status`                | No       | [OrderingModule.Domain.Enums.BasketItemInventoryStatus](#schema-orderingmodule-domain-enums-basketiteminventorystatus) | —                     |             |
| `statusFa`              | No       | string or null                                                                                                         | read-only             |             |
| `existCount`            | No       | integer (int32) or null                                                                                                | —                     |             |
| `oldCount`              | No       | integer (int32) or null                                                                                                | —                     |             |
| `pic`                   | No       | string or null                                                                                                         | —                     |             |
| `picUrl`                | No       | string or null                                                                                                         | read-only             |             |
| `id`                    | No       | integer (int64)                                                                                                        | —                     | شناسه       |

<a id="schema-orderingmodule-application-factorcqrs-factoraddressdto"></a>

### OrderingModule.Application.FactorCQRS.FactorAddressDTO

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema          | Constraints / default | Description |
| ------------------- | -------- | --------------- | --------------------- | ----------- |
| `title`             | No       | string or null  | —                     |             |
| `fullAddress`       | No       | string or null  | —                     |             |
| `plaque`            | No       | string or null  | —                     |             |
| `unit`              | No       | string or null  | —                     |             |
| `postalCode`        | No       | string or null  | —                     |             |
| `hasOtherReceiver`  | No       | boolean         | —                     |             |
| `receiverFirstName` | No       | string or null  | —                     |             |
| `receiverLastName`  | No       | string or null  | —                     |             |
| `receiverFullName`  | No       | string or null  | read-only             |             |
| `receiverPhone`     | No       | string or null  | —                     |             |
| `longitude`         | No       | string or null  | —                     |             |
| `latitude`          | No       | string or null  | —                     |             |
| `id`                | No       | integer (int64) | —                     | شناسه       |

<a id="schema-orderingmodule-application-factorcqrs-factordeliveryinfodto"></a>

### OrderingModule.Application.FactorCQRS.FactorDeliveryInfoDTO

- **Definition:** object
- **Additional properties:** False

| Property                | Required | Schema                                                                                                     | Constraints / default | Description |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `shopperId`             | No       | integer (int64) or null                                                                                    | —                     |             |
| `shopperName`           | No       | string or null                                                                                             | —                     |             |
| `deliveryType`          | No       | [Abstractions.Domain.Enums.DeliveryType](#schema-abstractions-domain-enums-deliverytype)                   | —                     |             |
| `deliveryTypeFa`        | No       | string or null                                                                                             | read-only             |             |
| `deliveryId`            | No       | integer (int64) or null                                                                                    | —                     |             |
| `deliveryName`          | No       | string or null                                                                                             | —                     |             |
| `snappDeliveryStatus`   | No       | [OrderingModule.Domain.Enums.SnappDeliveryStatus](#schema-orderingmodule-domain-enums-snappdeliverystatus) | —                     |             |
| `snappDeliveryStatusFa` | No       | string or null                                                                                             | read-only             |             |
| `snappOrderId`          | No       | integer (int64) or null                                                                                    | —                     |             |
| `snappDeliveryAmount`   | No       | integer (int64) or null                                                                                    | —                     |             |
| `snappStatus`           | No       | string or null                                                                                             | —                     |             |
| `snappStatusText`       | No       | string or null                                                                                             | —                     |             |
| `snappCreateDate`       | No       | string (date-time) or null                                                                                 | —                     |             |
| `snappOrderSteps`       | No       | string or null                                                                                             | —                     |             |
| `snappOrderCount`       | No       | integer (int32)                                                                                            | —                     |             |
| `snappTotalResult`      | No       | string or null                                                                                             | —                     |             |
| `id`                    | No       | integer (int64)                                                                                            | —                     | شناسه       |

<a id="schema-orderingmodule-application-factorcqrs-factordto"></a>

### OrderingModule.Application.FactorCQRS.FactorDTO

- **Definition:** object
- **Additional properties:** False

| Property              | Required | Schema                                                                                                                                 | Constraints / default | Description |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `factorNumber`        | No       | string or null                                                                                                                         | —                     |             |
| `customerId`          | No       | integer (int64) or null                                                                                                                | —                     |             |
| `customerName`        | No       | string or null                                                                                                                         | —                     |             |
| `customerMobile`      | No       | string or null                                                                                                                         | —                     |             |
| `storeId`             | No       | integer (int64)                                                                                                                        | —                     |             |
| `storeTitle`          | No       | string or null                                                                                                                         | —                     |             |
| `type`                | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                                       | —                     |             |
| `typeFa`              | No       | string or null                                                                                                                         | read-only             |             |
| `status`              | No       | [OrderingModule.Domain.Enums.BasketStatus](#schema-orderingmodule-domain-enums-basketstatus)                                           | —                     |             |
| `statusFa`            | No       | string or null                                                                                                                         | read-only             |             |
| `payType`             | No       | [OrderingModule.Domain.Enums.BasketPayType](#schema-orderingmodule-domain-enums-basketpaytype)                                         | —                     |             |
| `payTypeFa`           | No       | string or null                                                                                                                         | read-only             |             |
| `basketPrice`         | No       | integer (int64)                                                                                                                        | —                     |             |
| `hasHekmatPayment`    | No       | boolean                                                                                                                                | —                     |             |
| `discountId`          | No       | integer (int64) or null                                                                                                                | —                     |             |
| `discountCode`        | No       | string or null                                                                                                                         | —                     |             |
| `customerDescription` | No       | string or null                                                                                                                         | —                     |             |
| `isPrinted`           | No       | boolean                                                                                                                                | —                     |             |
| `createDate`          | No       | string (date-time)                                                                                                                     | —                     |             |
| `createDateFa`        | No       | string or null                                                                                                                         | read-only             |             |
| `payDate`             | No       | string (date-time)                                                                                                                     | —                     |             |
| `payDateFa`           | No       | string or null                                                                                                                         | read-only             |             |
| `amounts`             | No       | [OrderingModule.Domain.Entities.FactorAmount](#schema-orderingmodule-domain-entities-factoramount)                                     | —                     |             |
| `hekmatInfo`          | No       | [OrderingModule.Domain.Entities.BasketHekmatInfo](#schema-orderingmodule-domain-entities-baskethekmatinfo)                             | —                     |             |
| `products`            | No       | array<[OrderingModule.Application.DTOs.BasketItemDTO](#schema-orderingmodule-application-dtos-basketitemdto)> or null                  | —                     |             |
| `address`             | No       | [OrderingModule.Application.FactorCQRS.FactorAddressDTO](#schema-orderingmodule-application-factorcqrs-factoraddressdto)               | —                     |             |
| `deliveryInfo`        | No       | [OrderingModule.Application.FactorCQRS.FactorDeliveryInfoDTO](#schema-orderingmodule-application-factorcqrs-factordeliveryinfodto)     | —                     |             |
| `eifaInfo`            | No       | [OrderingModule.Application.FactorCQRS.FactorSendToEifaInfoDTO](#schema-orderingmodule-application-factorcqrs-factorsendtoeifainfodto) | —                     |             |
| `id`                  | No       | integer (int64)                                                                                                                        | —                     | شناسه       |

<a id="schema-orderingmodule-application-factorcqrs-factorgetcustomerlistdto"></a>

### OrderingModule.Application.FactorCQRS.FactorGetCustomerListDTO

- **Definition:** object
- **Additional properties:** False

| Property     | Required | Schema                                                                                                                    | Constraints / default | Description              |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------ |
| `page`       | No       | integer (int32)                                                                                                           | —                     | شماره صفحه               |
| `pageLength` | No       | integer (int32)                                                                                                           | —                     | تعداد فاکتور های هر صفحه |
| `pageCount`  | No       | integer (int32)                                                                                                           | —                     | تعداد صفحات              |
| `totalCount` | No       | integer (int32)                                                                                                           | —                     | تعداد کل فاکتور ها       |
| `factors`    | No       | array<[OrderingModule.Application.FactorCQRS.FactorDTO](#schema-orderingmodule-application-factorcqrs-factordto)> or null | —                     | فاکتور ها                |

<a id="schema-orderingmodule-application-factorcqrs-factorgetdetailsdto"></a>

### OrderingModule.Application.FactorCQRS.FactorGetDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property              | Required | Schema                                                                                                                                 | Constraints / default | Description |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `factorNumber`        | No       | string or null                                                                                                                         | —                     |             |
| `customerId`          | No       | integer (int64) or null                                                                                                                | —                     |             |
| `customerName`        | No       | string or null                                                                                                                         | —                     |             |
| `customerMobile`      | No       | string or null                                                                                                                         | —                     |             |
| `storeId`             | No       | integer (int64)                                                                                                                        | —                     |             |
| `storeTitle`          | No       | string or null                                                                                                                         | —                     |             |
| `type`                | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                                       | —                     |             |
| `typeFa`              | No       | string or null                                                                                                                         | read-only             |             |
| `status`              | No       | [OrderingModule.Domain.Enums.BasketStatus](#schema-orderingmodule-domain-enums-basketstatus)                                           | —                     |             |
| `statusFa`            | No       | string or null                                                                                                                         | read-only             |             |
| `payType`             | No       | [OrderingModule.Domain.Enums.BasketPayType](#schema-orderingmodule-domain-enums-basketpaytype)                                         | —                     |             |
| `payTypeFa`           | No       | string or null                                                                                                                         | read-only             |             |
| `basketPrice`         | No       | integer (int64)                                                                                                                        | —                     |             |
| `hasHekmatPayment`    | No       | boolean                                                                                                                                | —                     |             |
| `discountId`          | No       | integer (int64) or null                                                                                                                | —                     |             |
| `discountCode`        | No       | string or null                                                                                                                         | —                     |             |
| `customerDescription` | No       | string or null                                                                                                                         | —                     |             |
| `isPrinted`           | No       | boolean                                                                                                                                | —                     |             |
| `hasChange`           | No       | boolean or null                                                                                                                        | —                     |             |
| `createDate`          | No       | string (date-time)                                                                                                                     | —                     |             |
| `createDateFa`        | No       | string or null                                                                                                                         | read-only             |             |
| `payDate`             | No       | string (date-time)                                                                                                                     | —                     |             |
| `payDateFa`           | No       | string or null                                                                                                                         | read-only             |             |
| `deliveryStartDate`   | No       | string (date-time) or null                                                                                                             | —                     |             |
| `deliveryEndDate`     | No       | string (date-time) or null                                                                                                             | —                     |             |
| `deliveryDateFa`      | No       | string or null                                                                                                                         | read-only             |             |
| `applianceStatus`     | No       | [OrderingModule.Domain.Enums.ApplianceBasketStatus](#schema-orderingmodule-domain-enums-appliancebasketstatus)                         | —                     |             |
| `applianceStatusFa`   | No       | string or null                                                                                                                         | read-only             |             |
| `superMarketStatus`   | No       | [OrderingModule.Domain.Enums.SuperMarketBasketStatus](#schema-orderingmodule-domain-enums-supermarketbasketstatus)                     | —                     |             |
| `superMarketStatusFa` | No       | string or null                                                                                                                         | read-only             |             |
| `amounts`             | No       | [OrderingModule.Domain.Entities.FactorAmount](#schema-orderingmodule-domain-entities-factoramount)                                     | —                     |             |
| `hekmatInfo`          | No       | [OrderingModule.Domain.Entities.BasketHekmatInfo](#schema-orderingmodule-domain-entities-baskethekmatinfo)                             | —                     |             |
| `basketItems`         | No       | array<[OrderingModule.Application.DTOs.BasketItemDTO](#schema-orderingmodule-application-dtos-basketitemdto)> or null                  | —                     |             |
| `address`             | No       | [OrderingModule.Application.FactorCQRS.FactorAddressDTO](#schema-orderingmodule-application-factorcqrs-factoraddressdto)               | —                     |             |
| `deliveryInfo`        | No       | [OrderingModule.Application.FactorCQRS.FactorDeliveryInfoDTO](#schema-orderingmodule-application-factorcqrs-factordeliveryinfodto)     | —                     |             |
| `eifaInfo`            | No       | [OrderingModule.Application.FactorCQRS.FactorSendToEifaInfoDTO](#schema-orderingmodule-application-factorcqrs-factorsendtoeifainfodto) | —                     |             |
| `id`                  | No       | integer (int64)                                                                                                                        | —                     | شناسه       |

<a id="schema-orderingmodule-application-factorcqrs-factorsendtoeifainfodto"></a>

### OrderingModule.Application.FactorCQRS.FactorSendToEifaInfoDTO

- **Definition:** object
- **Additional properties:** False

| Property             | Required | Schema                                                                                                           | Constraints / default | Description |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `sendToEifaStatus`   | No       | [OrderingModule.Domain.Enums.BasketEifaStatus](#schema-orderingmodule-domain-enums-basketeifastatus)             | —                     |             |
| `sendToEifaStatusFa` | No       | string or null                                                                                                   | read-only             |             |
| `sentToEifaDate`     | No       | string (date-time) or null                                                                                       | —                     |             |
| `sentToEifaDateFa`   | No       | string or null                                                                                                   | read-only             |             |
| `submitInEifaDate`   | No       | string (date-time) or null                                                                                       | —                     |             |
| `submitInEifaDateFa` | No       | string or null                                                                                                   | read-only             |             |
| `eifaInvoiceNumber`  | No       | string or null                                                                                                   | —                     |             |
| `eifaReturnStatus`   | No       | [OrderingModule.Domain.Enums.EifaSubmitBasketStatus](#schema-orderingmodule-domain-enums-eifasubmitbasketstatus) | —                     |             |
| `eifaReturnStatusFa` | No       | string or null                                                                                                   | read-only             |             |
| `eifaMessage`        | No       | string or null                                                                                                   | —                     |             |
| `id`                 | No       | integer (int64)                                                                                                  | —                     | شناسه       |

<a id="schema-orderingmodule-domain-entities-basket"></a>

### OrderingModule.Domain.Entities.Basket

- **Definition:** object
- **Additional properties:** False

| Property              | Required | Schema                                                                                                                | Constraints / default | Description                                                   |
| --------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `factor`              | No       | [OrderingModule.Domain.Entities.Factor](#schema-orderingmodule-domain-entities-factor)                                | —                     |                                                               |
| `hekmatInfo`          | No       | [OrderingModule.Domain.Entities.BasketHekmatInfo](#schema-orderingmodule-domain-entities-baskethekmatinfo)            | —                     |                                                               |
| `customerId`          | No       | integer (int64) or null                                                                                               | —                     |                                                               |
| `customerName`        | No       | string or null                                                                                                        | —                     |                                                               |
| `customerMobile`      | No       | string or null                                                                                                        | —                     |                                                               |
| `storeId`             | No       | integer (int64)                                                                                                       | —                     |                                                               |
| `storeTitle`          | No       | string or null                                                                                                        | —                     |                                                               |
| `type`                | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                      | —                     |                                                               |
| `status`              | No       | [OrderingModule.Domain.Enums.BasketStatus](#schema-orderingmodule-domain-enums-basketstatus)                          | —                     |                                                               |
| `payType`             | No       | [OrderingModule.Domain.Enums.BasketPayType](#schema-orderingmodule-domain-enums-basketpaytype)                        | —                     |                                                               |
| `paygateId`           | No       | integer (int64) or null                                                                                               | —                     |                                                               |
| `paygateTitle`        | No       | string or null                                                                                                        | —                     |                                                               |
| `basketPrice`         | No       | integer (int64)                                                                                                       | —                     |                                                               |
| `hasHekmatPayment`    | No       | boolean                                                                                                               | —                     |                                                               |
| `discountId`          | No       | integer (int64) or null                                                                                               | —                     |                                                               |
| `discountCode`        | No       | string or null                                                                                                        | —                     |                                                               |
| `customerDescription` | No       | string or null                                                                                                        | —                     |                                                               |
| `createdPlatformType` | No       | [Abstractions.Domain.Enums.PlatformType](#schema-abstractions-domain-enums-platformtype)                              | —                     |                                                               |
| `paidPlatformType`    | No       | [Abstractions.Domain.Enums.PlatformType](#schema-abstractions-domain-enums-platformtype)                              | —                     |                                                               |
| `basketItems`         | No       | array<[OrderingModule.Domain.Entities.BasketItem](#schema-orderingmodule-domain-entities-basketitem)> or null         | —                     |                                                               |
| `timelines`           | No       | array<[OrderingModule.Domain.Entities.BasketTimeline](#schema-orderingmodule-domain-entities-baskettimeline)> or null | —                     |                                                               |
| `id`                  | No       | integer (int64)                                                                                                       | —                     |                                                               |
| `authLevel`           | No       | string or null                                                                                                        | —                     | سطح احراز هویت یا همان نوع پنلی که انتیتی از آن ایجاد شده است |
| `createdBy`           | No       | integer (int64) or null                                                                                               | —                     |                                                               |
| `createDate`          | No       | string (date-time)                                                                                                    | —                     |                                                               |
| `lastModifiedBy`      | No       | integer (int64) or null                                                                                               | —                     |                                                               |
| `modifyDate`          | No       | string (date-time) or null                                                                                            | —                     |                                                               |

<a id="schema-orderingmodule-domain-entities-baskethekmatinfo"></a>

### OrderingModule.Domain.Entities.BasketHekmatInfo

- **Definition:** object
- **Additional properties:** False

| Property               | Required | Schema                                                                                 | Constraints / default | Description                                                   |
| ---------------------- | -------- | -------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `basket`               | No       | [OrderingModule.Domain.Entities.Basket](#schema-orderingmodule-domain-entities-basket) | —                     |                                                               |
| `hekmatCardNo`         | No       | string or null                                                                         | —                     |                                                               |
| `hekmatDiscountCode`   | No       | string or null                                                                         | —                     |                                                               |
| `hekmatBuyCredit`      | No       | integer (int64) or null                                                                | —                     |                                                               |
| `hekmatDiscountCredit` | No       | integer (int64) or null                                                                | —                     |                                                               |
| `hekmatSubsidCredit`   | No       | integer (int64) or null                                                                | —                     |                                                               |
| `hekmatBonCredit`      | No       | integer (int64) or null                                                                | —                     |                                                               |
| `hekmatInquiryDate`    | No       | string (date-time) or null                                                             | —                     |                                                               |
| `id`                   | No       | integer (int64)                                                                        | —                     |                                                               |
| `authLevel`            | No       | string or null                                                                         | —                     | سطح احراز هویت یا همان نوع پنلی که انتیتی از آن ایجاد شده است |
| `createdBy`            | No       | integer (int64) or null                                                                | —                     |                                                               |
| `createDate`           | No       | string (date-time)                                                                     | —                     |                                                               |
| `lastModifiedBy`       | No       | integer (int64) or null                                                                | —                     |                                                               |
| `modifyDate`           | No       | string (date-time) or null                                                             | —                     |                                                               |

<a id="schema-orderingmodule-domain-entities-basketitem"></a>

### OrderingModule.Domain.Entities.BasketItem

- **Definition:** object
- **Additional properties:** False

| Property                | Required | Schema                                                                                                                 | Constraints / default | Description                                                   |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `basketId`              | No       | integer (int64)                                                                                                        | —                     |                                                               |
| `basket`                | No       | [OrderingModule.Domain.Entities.Basket](#schema-orderingmodule-domain-entities-basket)                                 | —                     |                                                               |
| `storeProductId`        | No       | integer (int64)                                                                                                        | —                     |                                                               |
| `productId`             | No       | integer (int64)                                                                                                        | —                     |                                                               |
| `productTitle`          | No       | string or null                                                                                                         | —                     |                                                               |
| `barcode`               | No       | string or null                                                                                                         | —                     |                                                               |
| `storeId`               | No       | integer (int64)                                                                                                        | —                     |                                                               |
| `storeTitle`            | No       | string or null                                                                                                         | —                     |                                                               |
| `productType`           | No       | [Abstractions.Domain.Enums.SiteType](#schema-abstractions-domain-enums-sitetype)                                       | —                     |                                                               |
| `isHeavyWeight`         | No       | boolean                                                                                                                | —                     |                                                               |
| `propertyId`            | No       | integer (int64) or null                                                                                                | —                     |                                                               |
| `propertyTitle`         | No       | string or null                                                                                                         | —                     |                                                               |
| `valueId`               | No       | integer (int64) or null                                                                                                | —                     |                                                               |
| `valueTitle`            | No       | string or null                                                                                                         | —                     |                                                               |
| `mainPrice`             | No       | integer (int64)                                                                                                        | —                     |                                                               |
| `offPrice`              | No       | integer (int64)                                                                                                        | —                     |                                                               |
| `currentPrice`          | No       | integer (int64)                                                                                                        | —                     |                                                               |
| `productCount`          | No       | integer (int32)                                                                                                        | —                     |                                                               |
| `hekmatDiscountAmount`  | No       | integer (int64)                                                                                                        | —                     |                                                               |
| `hekmatDiscountPercent` | No       | number (float)                                                                                                         | —                     |                                                               |
| `taxPercent`            | No       | number (float)                                                                                                         | —                     |                                                               |
| `taxAmount`             | No       | number (double)                                                                                                        | —                     |                                                               |
| `tollPercent`           | No       | number (float)                                                                                                         | —                     |                                                               |
| `tollAmount`            | No       | number (double)                                                                                                        | —                     |                                                               |
| `eifaDiscountId`        | No       | string or null                                                                                                         | —                     |                                                               |
| `status`                | No       | [OrderingModule.Domain.Enums.BasketItemInventoryStatus](#schema-orderingmodule-domain-enums-basketiteminventorystatus) | —                     |                                                               |
| `existCount`            | No       | integer (int32) or null                                                                                                | —                     |                                                               |
| `oldCount`              | No       | integer (int32) or null                                                                                                | —                     |                                                               |
| `isDeleted`             | No       | boolean                                                                                                                | —                     |                                                               |
| `id`                    | No       | integer (int64)                                                                                                        | —                     |                                                               |
| `authLevel`             | No       | string or null                                                                                                         | —                     | سطح احراز هویت یا همان نوع پنلی که انتیتی از آن ایجاد شده است |
| `createdBy`             | No       | integer (int64) or null                                                                                                | —                     |                                                               |
| `createDate`            | No       | string (date-time)                                                                                                     | —                     |                                                               |
| `lastModifiedBy`        | No       | integer (int64) or null                                                                                                | —                     |                                                               |
| `modifyDate`            | No       | string (date-time) or null                                                                                             | —                     |                                                               |

<a id="schema-orderingmodule-domain-entities-baskettimeline"></a>

### OrderingModule.Domain.Entities.BasketTimeline

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema                                                                                                             | Constraints / default | Description                                                   |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------------------- |
| `basketId`          | No       | integer (int64)                                                                                                    | —                     |                                                               |
| `basket`            | No       | [OrderingModule.Domain.Entities.Basket](#schema-orderingmodule-domain-entities-basket)                             | —                     |                                                               |
| `superMarketStatus` | No       | [OrderingModule.Domain.Enums.SuperMarketBasketStatus](#schema-orderingmodule-domain-enums-supermarketbasketstatus) | —                     |                                                               |
| `applianceStatus`   | No       | [OrderingModule.Domain.Enums.ApplianceBasketStatus](#schema-orderingmodule-domain-enums-appliancebasketstatus)     | —                     |                                                               |
| `creatorName`       | No       | string or null                                                                                                     | —                     |                                                               |
| `description`       | No       | string or null                                                                                                     | —                     |                                                               |
| `id`                | No       | integer (int64)                                                                                                    | —                     |                                                               |
| `authLevel`         | No       | string or null                                                                                                     | —                     | سطح احراز هویت یا همان نوع پنلی که انتیتی از آن ایجاد شده است |
| `createdBy`         | No       | integer (int64) or null                                                                                            | —                     |                                                               |
| `createDate`        | No       | string (date-time)                                                                                                 | —                     |                                                               |
| `lastModifiedBy`    | No       | integer (int64) or null                                                                                            | —                     |                                                               |
| `modifyDate`        | No       | string (date-time) or null                                                                                         | —                     |                                                               |

<a id="schema-orderingmodule-domain-entities-factor"></a>

### OrderingModule.Domain.Entities.Factor

- **Definition:** object
- **Additional properties:** False

| Property             | Required | Schema                                                                                                                      | Constraints / default | Description                                                   |
| -------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `basket`             | No       | [OrderingModule.Domain.Entities.Basket](#schema-orderingmodule-domain-entities-basket)                                      | —                     |                                                               |
| `number`             | No       | string or null                                                                                                              | —                     |                                                               |
| `payDate`            | No       | string (date-time)                                                                                                          | —                     |                                                               |
| `deliveryCode`       | No       | string or null                                                                                                              | —                     |                                                               |
| `deliveryDate`       | No       | string (date-time) or null                                                                                                  | —                     |                                                               |
| `hasChange`          | No       | boolean or null                                                                                                             | —                     |                                                               |
| `isPrinted`          | No       | boolean                                                                                                                     | —                     |                                                               |
| `hekmatPayDate`      | No       | string (date-time) or null                                                                                                  | —                     |                                                               |
| `hekmatRefundDate`   | No       | string (date-time) or null                                                                                                  | —                     |                                                               |
| `amounts`            | No       | [OrderingModule.Domain.Entities.FactorAmount](#schema-orderingmodule-domain-entities-factoramount)                          | —                     |                                                               |
| `address`            | No       | [OrderingModule.Domain.Entities.FactorAddress](#schema-orderingmodule-domain-entities-factoraddress)                        | —                     |                                                               |
| `deliveryInfo`       | No       | [OrderingModule.Domain.Entities.FactorDeliveryInfo](#schema-orderingmodule-domain-entities-factordeliveryinfo)              | —                     |                                                               |
| `eifaInfo`           | No       | [OrderingModule.Domain.Entities.FactorSendToEifaInfo](#schema-orderingmodule-domain-entities-factorsendtoeifainfo)          | —                     |                                                               |
| `factorPriceChanges` | No       | array<[OrderingModule.Domain.Entities.FactorPriceChange](#schema-orderingmodule-domain-entities-factorpricechange)> or null | —                     |                                                               |
| `id`                 | No       | integer (int64)                                                                                                             | —                     |                                                               |
| `authLevel`          | No       | string or null                                                                                                              | —                     | سطح احراز هویت یا همان نوع پنلی که انتیتی از آن ایجاد شده است |
| `createdBy`          | No       | integer (int64) or null                                                                                                     | —                     |                                                               |
| `createDate`         | No       | string (date-time)                                                                                                          | —                     |                                                               |
| `lastModifiedBy`     | No       | integer (int64) or null                                                                                                     | —                     |                                                               |
| `modifyDate`         | No       | string (date-time) or null                                                                                                  | —                     |                                                               |

<a id="schema-orderingmodule-domain-entities-factoraddress"></a>

### OrderingModule.Domain.Entities.FactorAddress

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema                                                                                 | Constraints / default | Description                                                   |
| ------------------- | -------- | -------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `factor`            | No       | [OrderingModule.Domain.Entities.Factor](#schema-orderingmodule-domain-entities-factor) | —                     |                                                               |
| `title`             | No       | string or null                                                                         | —                     |                                                               |
| `fullAddress`       | No       | string or null                                                                         | —                     |                                                               |
| `plaque`            | No       | string or null                                                                         | —                     |                                                               |
| `unit`              | No       | string or null                                                                         | —                     |                                                               |
| `postalCode`        | No       | string or null                                                                         | —                     |                                                               |
| `hasOtherReceiver`  | No       | boolean                                                                                | —                     |                                                               |
| `receiverFirstName` | No       | string or null                                                                         | —                     |                                                               |
| `receiverLastName`  | No       | string or null                                                                         | —                     |                                                               |
| `receiverPhone`     | No       | string or null                                                                         | —                     |                                                               |
| `longitude`         | No       | string or null                                                                         | —                     |                                                               |
| `doubleLongitude`   | No       | number (double)                                                                        | read-only             |                                                               |
| `latitude`          | No       | string or null                                                                         | —                     |                                                               |
| `doubleLatitude`    | No       | number (double)                                                                        | read-only             |                                                               |
| `id`                | No       | integer (int64)                                                                        | —                     |                                                               |
| `authLevel`         | No       | string or null                                                                         | —                     | سطح احراز هویت یا همان نوع پنلی که انتیتی از آن ایجاد شده است |
| `createdBy`         | No       | integer (int64) or null                                                                | —                     |                                                               |
| `createDate`        | No       | string (date-time)                                                                     | —                     |                                                               |
| `lastModifiedBy`    | No       | integer (int64) or null                                                                | —                     |                                                               |
| `modifyDate`        | No       | string (date-time) or null                                                             | —                     |                                                               |

<a id="schema-orderingmodule-domain-entities-factoramount"></a>

### OrderingModule.Domain.Entities.FactorAmount

- **Definition:** object
- **Additional properties:** False

| Property               | Required | Schema          | Constraints / default | Description |
| ---------------------- | -------- | --------------- | --------------------- | ----------- |
| `totalMainPrice`       | No       | integer (int64) | —                     |             |
| `totalOffPrice`        | No       | integer (int64) | —                     |             |
| `offDiscountAmount`    | No       | integer (int64) | —                     |             |
| `discountAmount`       | No       | integer (int64) | —                     |             |
| `hekmatIpgAmount`      | No       | integer (int64) | —                     |             |
| `hekmatIpgDiscount`    | No       | integer (int64) | —                     |             |
| `hekmatSubsidAmount`   | No       | integer (int64) | —                     |             |
| `hekmatBonAmount`      | No       | integer (int64) | —                     |             |
| `hekmatDiscountAmount` | No       | integer (int64) | —                     |             |
| `hekmatCreditAmount`   | No       | integer (int64) | —                     |             |
| `deliveryAmount`       | No       | integer (int64) | —                     |             |
| `serviceAmount`        | No       | integer (int64) | —                     |             |
| `balanceAmount`        | No       | integer (int64) | —                     |             |
| `paygateAmount`        | No       | integer (int64) | —                     |             |
| `posAmount`            | No       | integer (int64) | —                     |             |
| `changeRemainAmount`   | No       | integer (int64) | —                     |             |
| `isCleared`            | No       | boolean         | —                     |             |

<a id="schema-orderingmodule-domain-entities-factordeliveryinfo"></a>

### OrderingModule.Domain.Entities.FactorDeliveryInfo

- **Definition:** object
- **Additional properties:** False

| Property              | Required | Schema                                                                                                     | Constraints / default | Description                                                   |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `factor`              | No       | [OrderingModule.Domain.Entities.Factor](#schema-orderingmodule-domain-entities-factor)                     | —                     |                                                               |
| `shopperId`           | No       | integer (int64) or null                                                                                    | —                     |                                                               |
| `shopperName`         | No       | string or null                                                                                             | —                     |                                                               |
| `deliveryType`        | No       | [Abstractions.Domain.Enums.DeliveryType](#schema-abstractions-domain-enums-deliverytype)                   | —                     |                                                               |
| `deliveryId`          | No       | integer (int64) or null                                                                                    | —                     |                                                               |
| `deliveryName`        | No       | string or null                                                                                             | —                     |                                                               |
| `snappDeliveryStatus` | No       | [OrderingModule.Domain.Enums.SnappDeliveryStatus](#schema-orderingmodule-domain-enums-snappdeliverystatus) | —                     |                                                               |
| `snappOrderId`        | No       | integer (int64) or null                                                                                    | —                     |                                                               |
| `snappDeliveryAmount` | No       | integer (int64) or null                                                                                    | —                     |                                                               |
| `snappStatus`         | No       | string or null                                                                                             | —                     |                                                               |
| `snappStatusText`     | No       | string or null                                                                                             | —                     |                                                               |
| `snappCreateDate`     | No       | string (date-time) or null                                                                                 | —                     |                                                               |
| `snappOrderSteps`     | No       | string or null                                                                                             | —                     |                                                               |
| `snappOrderCount`     | No       | integer (int32)                                                                                            | —                     |                                                               |
| `snappTotalResult`    | No       | string or null                                                                                             | —                     |                                                               |
| `id`                  | No       | integer (int64)                                                                                            | —                     |                                                               |
| `authLevel`           | No       | string or null                                                                                             | —                     | سطح احراز هویت یا همان نوع پنلی که انتیتی از آن ایجاد شده است |
| `createdBy`           | No       | integer (int64) or null                                                                                    | —                     |                                                               |
| `createDate`          | No       | string (date-time)                                                                                         | —                     |                                                               |
| `lastModifiedBy`      | No       | integer (int64) or null                                                                                    | —                     |                                                               |
| `modifyDate`          | No       | string (date-time) or null                                                                                 | —                     |                                                               |

<a id="schema-orderingmodule-domain-entities-factorpricechange"></a>

### OrderingModule.Domain.Entities.FactorPriceChange

- **Definition:** object
- **Additional properties:** False

| Property                   | Required | Schema                                                                                 | Constraints / default | Description                                                   |
| -------------------------- | -------- | -------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `factorId`                 | No       | integer (int64)                                                                        | —                     |                                                               |
| `factor`                   | No       | [OrderingModule.Domain.Entities.Factor](#schema-orderingmodule-domain-entities-factor) | —                     |                                                               |
| `creatorName`              | No       | string or null                                                                         | —                     |                                                               |
| `oldTotalMainPrice`        | No       | integer (int64)                                                                        | —                     |                                                               |
| `oldTotalOffPrice`         | No       | integer (int64)                                                                        | —                     |                                                               |
| `oldOffDiscountAmount`     | No       | integer (int64)                                                                        | —                     |                                                               |
| `oldDiscountAmount`        | No       | integer (int64)                                                                        | —                     |                                                               |
| `oldHekmatDiscountAmount`  | No       | integer (int64)                                                                        | —                     |                                                               |
| `oldHekmatBuyCreditAmount` | No       | integer (int64)                                                                        | —                     |                                                               |
| `oldBalanceAmount`         | No       | integer (int64)                                                                        | —                     |                                                               |
| `newTotalMainPrice`        | No       | integer (int64)                                                                        | —                     |                                                               |
| `newTotalOffPrice`         | No       | integer (int64)                                                                        | —                     |                                                               |
| `newOffDiscountAmount`     | No       | integer (int64)                                                                        | —                     |                                                               |
| `newDiscountAmount`        | No       | integer (int64)                                                                        | —                     |                                                               |
| `newHekmatDiscountAmount`  | No       | integer (int64)                                                                        | —                     |                                                               |
| `newHekmatBuyCreditAmount` | No       | integer (int64)                                                                        | —                     |                                                               |
| `newBalanceAmount`         | No       | integer (int64)                                                                        | —                     |                                                               |
| `payGateAmount`            | No       | integer (int64)                                                                        | —                     |                                                               |
| `changeRemainAmount`       | No       | integer (int64)                                                                        | —                     |                                                               |
| `isCleared`                | No       | boolean                                                                                | —                     |                                                               |
| `settlerId`                | No       | integer (int64) or null                                                                | —                     |                                                               |
| `settlerName`              | No       | string or null                                                                         | —                     |                                                               |
| `clearDate`                | No       | string (date-time) or null                                                             | —                     |                                                               |
| `id`                       | No       | integer (int64)                                                                        | —                     |                                                               |
| `authLevel`                | No       | string or null                                                                         | —                     | سطح احراز هویت یا همان نوع پنلی که انتیتی از آن ایجاد شده است |
| `createdBy`                | No       | integer (int64) or null                                                                | —                     |                                                               |
| `createDate`               | No       | string (date-time)                                                                     | —                     |                                                               |
| `lastModifiedBy`           | No       | integer (int64) or null                                                                | —                     |                                                               |
| `modifyDate`               | No       | string (date-time) or null                                                             | —                     |                                                               |

<a id="schema-orderingmodule-domain-entities-factorsendtoeifainfo"></a>

### OrderingModule.Domain.Entities.FactorSendToEifaInfo

- **Definition:** object
- **Additional properties:** False

| Property            | Required | Schema                                                                                                           | Constraints / default | Description                                                   |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| `factor`            | No       | [OrderingModule.Domain.Entities.Factor](#schema-orderingmodule-domain-entities-factor)                           | —                     |                                                               |
| `sendToEifaStatus`  | No       | [OrderingModule.Domain.Enums.BasketEifaStatus](#schema-orderingmodule-domain-enums-basketeifastatus)             | —                     |                                                               |
| `sentToEifaDate`    | No       | string (date-time) or null                                                                                       | —                     |                                                               |
| `submitInEifaDate`  | No       | string (date-time) or null                                                                                       | —                     |                                                               |
| `eifaInvoiceNumber` | No       | string or null                                                                                                   | —                     |                                                               |
| `eifaReturnStatus`  | No       | [OrderingModule.Domain.Enums.EifaSubmitBasketStatus](#schema-orderingmodule-domain-enums-eifasubmitbasketstatus) | —                     |                                                               |
| `eifaMessage`       | No       | string or null                                                                                                   | —                     |                                                               |
| `id`                | No       | integer (int64)                                                                                                  | —                     |                                                               |
| `authLevel`         | No       | string or null                                                                                                   | —                     | سطح احراز هویت یا همان نوع پنلی که انتیتی از آن ایجاد شده است |
| `createdBy`         | No       | integer (int64) or null                                                                                          | —                     |                                                               |
| `createDate`        | No       | string (date-time)                                                                                               | —                     |                                                               |
| `lastModifiedBy`    | No       | integer (int64) or null                                                                                          | —                     |                                                               |
| `modifyDate`        | No       | string (date-time) or null                                                                                       | —                     |                                                               |

<a id="schema-orderingmodule-domain-enums-appliancebasketstatus"></a>

### OrderingModule.Domain.Enums.ApplianceBasketStatus

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `4`, `5`, `10`
- **Description:** 0 = Open (سبد باز)<br>1 = Paid (ثبت سفارش)<br>2 = Proccessing (در حال آماده سازی)<br>3 = Delivery (در اختیار پیک)<br>4 = Delivered (تحویل شده)<br>5 = Canceled (لغو شده)<br>10 = ImperfectPayment (تراکنش ناقص)

**Allowed values:** `0`, `1`, `2`, `3`, `4`, `5`, `10`

<a id="schema-orderingmodule-domain-enums-basketeifastatus"></a>

### OrderingModule.Domain.Enums.BasketEifaStatus

- **Definition:** integer (int32); enum: `1`, `2`, `3`
- **Description:** 1 = NotSend (ارسال نشده)<br>2 = SendToEifa (ارسال شده (تایید نشده))<br>3 = SubmitInEifa (تایید شده)

**Allowed values:** `1`, `2`, `3`

<a id="schema-orderingmodule-domain-enums-basketiteminventorystatus"></a>

### OrderingModule.Domain.Enums.BasketItemInventoryStatus

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `4`, `5`
- **Description:** 0 = None (نامشخص)<br>1 = Exist (موجود)<br>2 = NotExist (ناموجود)<br>3 = Imperfect (ناقص)<br>4 = Updated (اصلاح شده)<br>5 = Added (اضافه شده توسط سوپروایزر)

**Allowed values:** `0`, `1`, `2`, `3`, `4`, `5`

<a id="schema-orderingmodule-domain-enums-basketpaytype"></a>

### OrderingModule.Domain.Enums.BasketPayType

- **Definition:** integer (int32); enum: `1`, `2`, `3`, `4`
- **Description:** 1 = PayGate (درگاه پرداخت اینترنتی)<br>2 = Pos (پرداخت در محل)<br>3 = Credit (پرداخت اعتباری)<br>4 = HekmatIpg (درگاه پرداخت حکمت)

**Allowed values:** `1`, `2`, `3`, `4`

<a id="schema-orderingmodule-domain-enums-basketstatus"></a>

### OrderingModule.Domain.Enums.BasketStatus

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `10`
- **Description:** 0 = Open (سبد باز)<br>1 = Paid (ثبت سفارش)<br>2 = Delivered (تحویل شده)<br>3 = Canceled (لغو شده)<br>10 = ImperfectPayment (تراکنش ناقص)

**Allowed values:** `0`, `1`, `2`, `3`, `10`

<a id="schema-orderingmodule-domain-enums-eifasubmitbasketstatus"></a>

### OrderingModule.Domain.Enums.EifaSubmitBasketStatus

- **Definition:** integer (int32); enum: `1`, `2`, `3`, `4`
- **Description:** 1 = Success (موفق)<br>2 = Duplicate (فاکتور تکراری)<br>3 = PaymentMismatch (مغایرت مبالغ پرداختی با مبلغ کل فاکتور)<br>4 = Other (سایر خطاها)

**Allowed values:** `1`, `2`, `3`, `4`

<a id="schema-orderingmodule-domain-enums-snappdeliverystatus"></a>

### OrderingModule.Domain.Enums.SnappDeliveryStatus

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `99`
- **Description:** 0 = PendingForOrder (در انتظار ثبت سفارش)<br>1 = PlaceOrder (ثبت سفارش در اسنپ)<br>2 = AcceptDriver (پذیرش راننده)<br>3 = ArriveAtPickup (رسیدن به مبدأ)<br>4 = ReceivePackage (دریافت مرسوله)<br>5 = ArriveAtDestination (رسیدن به مقصد)<br>6 = CompleteOrder (اتمام سفارش)<br>99 = PendingForCancel (در انتظار کنسل کردن سفارش)

**Allowed values:** `0`, `1`, `2`, `3`, `4`, `5`, `6`, `99`

<a id="schema-orderingmodule-domain-enums-supermarketbasketstatus"></a>

### OrderingModule.Domain.Enums.SuperMarketBasketStatus

- **Definition:** integer (int32); enum: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `10`
- **Description:** 0 = Open (سبد باز)<br>1 = Paid (ثبت سفارش)<br>2 = Shopper (در اختیار شاپر)<br>3 = Supervisor (در اختیار سوپروایزر)<br>4 = Delivery (در اختیار پیک)<br>5 = Delivered (تحویل شده)<br>6 = Rejected (مرجوع شده)<br>7 = Canceled (لغو شده)<br>10 = ImperfectPayment (تراکنش ناقص)

**Allowed values:** `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `10`

<a id="schema-surveymodule-application-surveycqrs-surveygetdetailsdto"></a>

### SurveyModule.Application.SurveyCQRS.SurveyGetDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property         | Required | Schema                                                                                                                                                    | Constraints / default | Description |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `title`          | No       | string or null                                                                                                                                            | —                     |             |
| `isFactorSurvay` | No       | boolean                                                                                                                                                   | —                     |             |
| `questions`      | No       | array<[SurveyModule.Application.SurveyCQRS.SurveyQuestionGetDetailsDTO](#schema-surveymodule-application-surveycqrs-surveyquestiongetdetailsdto)> or null | —                     |             |
| `id`             | No       | integer (int64)                                                                                                                                           | —                     | شناسه       |

<a id="schema-surveymodule-application-surveycqrs-surveyoptiongetdetailsdto"></a>

### SurveyModule.Application.SurveyCQRS.SurveyOptionGetDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property | Required | Schema          | Constraints / default | Description |
| -------- | -------- | --------------- | --------------------- | ----------- |
| `text`   | No       | string or null  | —                     |             |
| `id`     | No       | integer (int64) | —                     | شناسه       |

<a id="schema-surveymodule-application-surveycqrs-surveyquestiongetdetailsdto"></a>

### SurveyModule.Application.SurveyCQRS.SurveyQuestionGetDetailsDTO

- **Definition:** object
- **Additional properties:** False

| Property  | Required | Schema                                                                                                                                                | Constraints / default | Description |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `text`    | No       | string or null                                                                                                                                        | —                     |             |
| `options` | No       | array<[SurveyModule.Application.SurveyCQRS.SurveyOptionGetDetailsDTO](#schema-surveymodule-application-surveycqrs-surveyoptiongetdetailsdto)> or null | —                     |             |
| `id`      | No       | integer (int64)                                                                                                                                       | —                     | شناسه       |

<a id="schema-surveymodule-application-surveyresponsecqrs-surveyresponsesaveresponsecommand"></a>

### SurveyModule.Application.SurveyResponseCQRS.SurveyResponseSaveResponseCommand

- **Definition:** object
- **Additional properties:** False

| Property    | Required | Schema                         | Constraints / default | Description |
| ----------- | -------- | ------------------------------ | --------------------- | ----------- |
| `surveyId`  | No       | integer (int64)                | —                     |             |
| `factorId`  | No       | integer (int64) or null        | —                     |             |
| `optionIds` | No       | array<integer (int64)> or null | —                     |             |
