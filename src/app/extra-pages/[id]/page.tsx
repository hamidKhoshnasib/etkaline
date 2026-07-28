import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, FileText } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/Container";
import { getExtraPage } from "@/features/extra-pages/api/get-extra-page";
import { sanitizeCmsHtml } from "@/features/cms-page/lib/sanitize-cms-html";

type Props = { params: Promise<{ id: string }> };

function parsePageId(value: string): number | null {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

async function resolveExtraPage(params: Props["params"]) {
  const id = parsePageId((await params).id);
  return id ? getExtraPage(id) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await resolveExtraPage(params);
  if (!page) {
    return { title: "صفحه پیدا نشد" };
  }

  return {
    title: page.metaTitle ?? page.title,
    description: page.seoDescription ?? undefined,
  };
}

export default async function ExtraPage({ params }: Props) {
  const page = await resolveExtraPage(params);
  if (!page) {
    notFound();
  }

  return (
    <Container as="main" className="w-full flex-1 py-10">
      <Card className="mx-auto max-w-4xl rounded-2xl shadow-none">
        <CardHeader>
          <CardTitle className="text-secondary text-2xl">{page.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <article
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(page.text) }}
          />
        </CardContent>
        {page.files.length > 0 && (
          <CardFooter className="flex flex-col items-stretch gap-3 border-t pt-5">
            <h2 className="text-secondary font-bold">فایل‌های مرتبط</h2>
            {page.files.map((file) => (
              <div
                key={file.id}
                className="bg-muted flex items-center justify-between gap-4 rounded-xl p-3"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <FileText className="text-primary-hover size-5 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-secondary truncate font-bold">{file.fileName}</p>
                    {file.fileDescription && (
                      <p className="text-muted-foreground truncate text-sm">
                        {file.fileDescription}
                      </p>
                    )}
                  </div>
                </div>
                {file.downloadUrl && (
                  <a
                    className="text-primary-hover hover:text-primary-hover/80 shrink-0 text-sm font-bold"
                    href={file.downloadUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    دانلود
                  </a>
                )}
              </div>
            ))}
          </CardFooter>
        )}
      </Card>
    </Container>
  );
}
