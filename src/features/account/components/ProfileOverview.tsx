"use client";

import {
  AlertCircle,
  Check,
  CreditCard,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { buttonVariants, Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import {
  profileQueryKeys,
  useProfile,
  useUpdateProfile,
  type Profile,
} from "@/features/account/api/use-profile";
import { cn } from "@/lib/utils";
import { useStorefront } from "@/providers/storefront-provider";

type ProfileDetail = {
  label: string;
  value: string;
  icon: typeof UserRound;
  direction?: "ltr";
};

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function normalizeNationalCode(value: string) {
  return value
    .replace(/[۰-۹٠-٩]/g, (digit) => {
      const digitIndex = PERSIAN_DIGITS.indexOf(digit);
      return String(digitIndex >= 0 ? digitIndex : ARABIC_DIGITS.indexOf(digit));
    })
    .replace(/\D/g, "");
}

function maskNationalCode(nationalCode: string) {
  if (nationalCode.length <= 4) {
    return nationalCode;
  }

  return `${nationalCode.slice(0, 2)}******${nationalCode.slice(-2)}`;
}

function profileDetails(profile: Profile): ReadonlyArray<ProfileDetail> {
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ");

  return [
    {
      label: "کد ملی",
      value: maskNationalCode(profile.nationalCode) || "ثبت نشده",
      icon: CreditCard,
      direction: "ltr",
    },
    { label: "ایمیل", value: profile.email || "ثبت نشده", icon: Mail, direction: "ltr" },
    { label: "شماره موبایل", value: profile.mobile || "ثبت نشده", icon: Phone, direction: "ltr" },
    { label: "نام و نام خانوادگی", value: fullName || "ثبت نشده", icon: UserRound },
    {
      label: "وضعیت حساب",
      value: profile.isEnabled ? "فعال" : "غیرفعال",
      icon: ShieldCheck,
    },
  ];
}

export function ProfileOverviewSkeleton() {
  return (
    <section
      className="flex flex-col gap-3"
      aria-busy="true"
      aria-label="در حال دریافت اطلاعات پروفایل"
    >
      <div className="flex items-center justify-between px-4 lg:px-0">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-17 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
}

function ProfileEditForm({
  profile,
  onSaved,
  routeMode = false,
}: {
  profile: Profile;
  onSaved: () => void;
  routeMode?: boolean;
}) {
  const queryClient = useQueryClient();
  const { siteType } = useStorefront();
  const { update: updateSession } = useSession();
  const updateProfile = useUpdateProfile();
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [nationalCode, setNationalCode] = useState(profile.nationalCode);
  const [email, setEmail] = useState(profile.email);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateProfile.mutate(
      {
        id: profile.id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        nationalCode: normalizeNationalCode(nationalCode),
        email: email.trim(),
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail(siteType) });
          await updateSession({
            user: { name: [firstName.trim(), lastName.trim()].filter(Boolean).join(" ") },
          });
          toast.success("اطلاعات حساب کاربری با موفقیت ویرایش شد.");
          onSaved();
        },
      },
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div
        className={cn("flex items-center justify-between gap-3 px-4 lg:px-0", routeMode && "px-0")}
      >
        <h1
          id="profile-overview-title"
          className={cn("text-secondary text-lg font-bold", routeMode && "hidden lg:block")}
        >
          ویرایش حساب کاربری
        </h1>
        <Button
          className={cn(routeMode && "w-36")}
          size="lg"
          type="submit"
          disabled={updateProfile.isPending}
        >
          <Check data-icon="inline-start" className={cn(updateProfile.isPending && "hidden")} />
          {updateProfile.isPending ? "در حال ثبت" : "تایید"}
        </Button>
      </div>

      <FieldGroup className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="profile-first-name">نام</FieldLabel>
          <Input
            id="profile-first-name"
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            autoComplete="given-name"
            required
            className="bg-card h-12"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-last-name">نام خانوادگی</FieldLabel>
          <Input
            id="profile-last-name"
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            autoComplete="family-name"
            required
            className="bg-card h-12"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-national-code">کد ملی</FieldLabel>
          <Input
            id="profile-national-code"
            name="nationalCode"
            value={nationalCode}
            onChange={(event) => setNationalCode(normalizeNationalCode(event.target.value))}
            inputMode="numeric"
            pattern="[0-9]*"
            dir="ltr"
            required
            className="bg-card h-12 text-right"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-email">ایمیل</FieldLabel>
          <Input
            id="profile-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            dir="ltr"
            required
            className="bg-card h-12 text-right"
          />
        </Field>
      </FieldGroup>

      {updateProfile.error && <FieldError>{updateProfile.error.message}</FieldError>}
    </form>
  );
}

export function ProfileOverview({ editPage = false }: { editPage?: boolean }) {
  const { data: profile, error, isLoading, sessionStatus } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  if (sessionStatus === "loading" || isLoading) {
    return (
      <div className={cn(!editPage && "hidden lg:block")}>
        <ProfileOverviewSkeleton />
      </div>
    );
  }

  if (!profile || error) {
    return (
      <div className={cn(!editPage && "hidden lg:block")}>
        <Empty className="bg-card min-h-72">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>اطلاعات پروفایل در دسترس نیست</EmptyTitle>
            <EmptyDescription>
              {error?.message ||
                "برای مشاهده اطلاعات حساب، دوباره وارد شوید یا چند لحظه دیگر تلاش کنید."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className={cn(editPage && "min-h-full lg:pt-2")}>
        {editPage && (
          <MobilePageHeader fallbackHref="/account/profile" title="ویرایش حساب کاربری" />
        )}
        <div className={cn(editPage && "px-4 py-6 lg:px-0 lg:py-0")}>
          <ProfileEditForm
            key={profile.id}
            profile={profile}
            routeMode={editPage}
            onSaved={() => {
              if (editPage) {
                router.replace("/account/profile");
                return;
              }

              setIsEditing(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {editPage && <MobilePageHeader fallbackHref="/account/profile" title="ویرایش حساب کاربری" />}
      <section
        className={cn(
          "flex min-w-0 flex-col gap-3 lg:gap-4",
          editPage ? "px-4 py-6 lg:px-0 lg:py-0" : "hidden lg:flex",
        )}
        aria-labelledby="profile-overview-title"
      >
        <div className="flex items-center justify-between gap-3 px-4 lg:px-0">
          <h1
            id="profile-overview-title"
            className={cn("text-secondary text-lg font-bold", editPage && "hidden lg:block")}
          >
            حساب کاربری
          </h1>
          {editPage ? (
            <Button
              className="w-36"
              variant="outline-primary"
              size="lg"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              <Pencil data-icon="inline-start" />
              ویرایش اطلاعات
            </Button>
          ) : (
            <>
              <Link
                href="/account/profile/edit"
                className={cn(
                  buttonVariants({ variant: "outline-primary", size: "lg" }),
                  "lg:hidden",
                )}
              >
                <Pencil data-icon="inline-start" />
                ویرایش اطلاعات
              </Link>
              <Button
                className="hidden lg:inline-flex"
                variant="outline-primary"
                size="lg"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                <Pencil data-icon="inline-start" />
                ویرایش اطلاعات
              </Button>
            </>
          )}
        </div>

        <dl className="flex flex-col gap-1.5">
          {profileDetails(profile).map(({ icon: Icon, label, value, direction }) => (
            <div
              key={label}
              dir="rtl"
              className="bg-card ring-foreground/5 flex min-h-17 items-center gap-4 rounded-xl px-4 py-3 ring-1 lg:px-5"
            >
              <Icon className="text-muted-foreground shrink-0" aria-hidden="true" />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-start">
                <dt className="text-muted-foreground text-sm">{label}</dt>
                <dd className="truncate text-right font-semibold text-[#475569]" dir={direction}>
                  {value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
