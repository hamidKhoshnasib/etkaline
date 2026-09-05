import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

import styles from "./TermsPage.module.css";

export function TermsPageSkeleton() {
  return (
    <main className="bg-muted/30 flex-1" aria-busy="true">
      <Container className="py-5 lg:py-8">
        <Skeleton className="h-5 w-40" />
        <div
          className={`${styles.layout} grid grid-cols-1 gap-6 pt-14 pb-16 lg:items-start lg:gap-8 lg:pt-20 lg:pb-24`}
        >
          <Card className="w-full">
            <CardContent className="flex flex-row gap-2 lg:flex-col">
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className="h-10 w-32 shrink-0 lg:w-full" />
              ))}
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardHeader className="flex flex-col gap-3">
              <Skeleton className="h-10 w-72 max-w-full" />
              <Skeleton className="h-5 w-44" />
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}
