"use client";

export function DeleteButton({
  id,
  action,
  confirmText = "Delete this item?",
}: {
  id: string;
  action: (formData: FormData) => void;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm font-medium text-danger hover:underline"
      >
        Delete
      </button>
    </form>
  );
}
