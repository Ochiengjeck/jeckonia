"use client";

import { useActionState } from "react";
import { updateAccount } from "@/lib/actions/account";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

const initialState: { error?: string; success?: string } = {};

export default function AccountPage() {
  const [state, formAction] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => updateAccount(formData),
    initialState
  );

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-heading">Account Settings</h1>
      <form action={formAction} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>New Email</label>
          <input type="email" name="email" placeholder="Leave blank to keep current" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Leave blank to keep current"
            className={inputClass}
          />
        </div>
        {state.error && <p className="text-sm text-danger">{state.error}</p>}
        {state.success && <p className="text-sm text-success">{state.success}</p>}
        <SubmitButton>Update Account</SubmitButton>
      </form>
    </div>
  );
}
