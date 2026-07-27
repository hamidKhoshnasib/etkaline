"use client";

import { AlertCircle, CreditCard, Mail, Pencil, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import {
  profileQueryKeys,
  useProfile,
  useUpdateProfile,
  type Profile,
} from "@/features/account/api/use-profile";

type ProfileDetail = {
  label: string;
  value: string;
  icon: typeof UserRound;
  direction?: "ltr";
};

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

function ProfileEditForm({ profile, onSaved }: { profile: Profile; onSaved: () => void }) {
  const queryClient = useQueryClient();
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
        nationalCode: nationalCode.trim(),
        email: email.trim(),
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail });
          toast.success("اطلاعات حساب کاربری با موفقیت ویرایش شد.");
          onSaved();
        },
      },
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div className="flex items-center justify-between gap-3 px-4 lg:px-0">
        <h1 id="profile-overview-title" className="text-secondary text-lg font-bold">
          ویرایش حساب کاربری
        </h1>
        <Button size="lg" type="submit" disabled={updateProfile.isPending}>
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
            onChange={(event) => setNationalCode(event.target.value)}
            inputMode="numeric"
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

export function ProfileOverview() {
  const { data: profile, error, isLoading, sessionStatus } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  if (sessionStatus === "loading" || isLoading) {
    return <ProfileOverviewSkeleton />;
  }

  if (!profile || error) {
    return (
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
    );
  }

  if (isEditing) {
    return (
      <ProfileEditForm key={profile.id} profile={profile} onSaved={() => setIsEditing(false)} />
    );
  }

  return (
    <section
      className="flex min-w-0 flex-col gap-3 lg:gap-4"
      aria-labelledby="profile-overview-title"
    >
      <div className="flex items-center justify-between gap-3 px-4 lg:px-0">
        <h1 id="profile-overview-title" className="text-secondary text-lg font-bold">
          حساب کاربری
        </h1>
        <Button
          variant="outline-primary"
          size="lg"
          type="button"
          onClick={() => setIsEditing(true)}
        >
          <Pencil data-icon="inline-start" />
          ویرایش اطلاعات
        </Button>
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
  );
}
