import type { DocumentActionComponent } from "sanity";

const labels: Record<string, string> = { publish: "প্রকাশ করুন", unpublish: "প্রকাশনা প্রত্যাহার", delete: "মুছে ফেলুন", duplicate: "অনুলিপি তৈরি", discardChanges: "খসড়ার পরিবর্তন বাতিল", restore: "পুনরুদ্ধার করুন" };
export function localizedActions(actions: DocumentActionComponent[]) {
  return actions.map((Action) => {
    const label = Action.action && labels[Action.action];
    if (!label) return Action;
    const LocalizedAction: DocumentActionComponent = (props) => {
      const descriptor = Action(props);
      return descriptor ? { ...descriptor, label } : descriptor;
    };
    LocalizedAction.action = Action.action;
    return LocalizedAction;
  });
}
