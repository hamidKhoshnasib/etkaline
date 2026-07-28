import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExtraPageLoading() {
  return (
    <Container as="main" className="w-full flex-1 py-10" aria-busy="true">
      <Card className="mx-auto max-w-4xl rounded-2xl shadow-none">
        <CardHeader className="gap-3">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-4 w-36" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-3/5" />
        </CardContent>
      </Card>
    </Container>
  );
}
