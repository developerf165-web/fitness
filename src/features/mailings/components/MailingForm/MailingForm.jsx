import MailingFormHeader from "./MailingFormHeader";
import MailingFormBody from "./MailingFormBody";
import MailingFormFooter from "./MailingFormFooter";

const MailingForm = ({ type}) => {
  const title = type === "birthday" ? "ДЕНЬ РОЖДЕНИЯ" : "ПРАЗДНИК";

  return (
    <div className="w-full pb-6 color-bg-card rounded-2xl p-1 h-full flex flex-col">
      <MailingFormHeader title={title} />
      <MailingFormBody type={type} />
    </div>
  );
};

export default MailingForm;