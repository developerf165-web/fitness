import React from "react";
import BalanceInfo from "./BalanceInfo";
import ServiceTabs from "./ServiceTabs";
import InputField from "./InputField";
import Summary from "./Summary";
import ActionButtons from "./ActionButtons";

export default function PaymentCard() {
  return (
    <div className="max-w-md mx-auto color-bg-nav shadow-xl rounded-2xl p-12 pt-5 text-white">
      <BalanceInfo />
      <ServiceTabs />

      <InputField label="Услуга" placeholder="Услуга" hasArrow />
      <InputField label="Количество" placeholder="Количество" />
      <InputField label="Оплата бонусами" placeholder="Бонусы" />

      <Summary />
      <ActionButtons />
    </div>
  );
}
