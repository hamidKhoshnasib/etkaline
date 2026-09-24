"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { profileQueryKeys, useCompleteProfile } from "@/features/account/api/use-profile";
import { useStorefront } from "@/providers/storefront-provider";

interface CompleteProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onCompleted: () => void | Promise<void>;
}

export function CompleteProfileDialog({ open, onClose, onCompleted }: CompleteProfileDialogProps) {
  const { update: updateSession } = useSession();
  const { siteType } = useStorefront();
  const queryClient = useQueryClient();
  const router = useRouter();
  const completeProfile = useCompleteProfile();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const normalizedFirstName = firstName.trim();
  const normalizedLastName = lastName.trim();
  const firstNameIsInvalid = submitted && !normalizedFirstName;
  const lastNameIsInvalid = submitted && !normalizedLastName;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (!normalizedFirstName || !normalizedLastName) {
      return;
    }

    try {
      await completeProfile.mutateAsync({
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
      });

      await updateSession({
        user: {
          name: `${normalizedFirstName} ${normalizedLastName}`,
          needCompleteProfile: false,
        },
      });
      await queryClient.invalidateQueries({ queryKey: profileQueryKeys.detail(siteType) });
      router.refresh();
      window.dispatchEvent(new Event("etkala:authenticated"));
      toast.success("اطلاعات حساب کاربری با موفقیت تکمیل شد.");
      await onCompleted();
    } catch {
      // The mutation error is rendered inside the dialog.
    }
  }

  return (
    <Dialog
      disablePointerDismissal
      modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent
        data-site={siteType}
        showCloseButton={false}
        className="max-w-[calc(100%-2rem)] gap-6 rounded-[28px] p-6 sm:max-w-md"
      >
        <DialogClose
          render={
            <Button
              aria-label="بستن مدال تکمیل اطلاعات حساب کاربری"
              className="absolute end-4 top-4"
              size="icon-sm"
              type="button"
              variant="ghost"
            />
          }
        >
          <XIcon />
          <span className="sr-only">بستن</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-secondary text-lg font-bold">
            تکمیل اطلاعات حساب کاربری
          </DialogTitle>
          <DialogDescription>برای ادامه، نام و نام خانوادگی خود را وارد کنید.</DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            <Field data-invalid={firstNameIsInvalid || undefined}>
              <FieldLabel htmlFor="complete-profile-first-name">نام</FieldLabel>
              <Input
                id="complete-profile-first-name"
                name="firstName"
                autoComplete="given-name"
                aria-invalid={firstNameIsInvalid || undefined}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                className="bg-card h-12"
              />
              {firstNameIsInvalid ? <FieldError>نام را وارد کنید.</FieldError> : null}
            </Field>

            <Field data-invalid={lastNameIsInvalid || undefined}>
              <FieldLabel htmlFor="complete-profile-last-name">نام خانوادگی</FieldLabel>
              <Input
                id="complete-profile-last-name"
                name="lastName"
                autoComplete="family-name"
                aria-invalid={lastNameIsInvalid || undefined}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                className="bg-card h-12"
              />
              {lastNameIsInvalid ? <FieldError>نام خانوادگی را وارد کنید.</FieldError> : null}
            </Field>
          </FieldGroup>

          {completeProfile.error ? <FieldError>{completeProfile.error.message}</FieldError> : null}

          <Button
            aria-busy={completeProfile.isPending}
            className="h-12 w-full rounded-full"
            disabled={completeProfile.isPending}
            size="lg"
            type="submit"
          >
            {completeProfile.isPending ? (
              <Spinner data-icon="inline-start" className="size-4" />
            ) : null}
            {completeProfile.isPending ? "در حال ثبت" : "ثبت و ادامه"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
