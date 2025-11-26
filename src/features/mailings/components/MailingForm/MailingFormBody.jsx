import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { labelStyle, inputStyle } from "./styles"; // radioStyle-ро истифода набурдем, метавон тоза кард
import MailingFormFooter from "./MailingFormFooter";
import SelectWithOptions from "../../../../pages/components/ui/SelectWithOptions/SelectWithOptions";
import RadioGroup from "../../../../pages/components/ui/RadioGroup";

const promotionData = [
  {
    title: 'Услуги',
    items: ['Йога', 'Солярий', 'Танцы', 'Массаж'],
  },
  {
    title: 'Курсы',
    items: ['Курс индивидуальный', 'Курс групповой'],
  },
];

const MailingFormBody = ({ type, onClose }) => {
  const [mailingName, setMailingName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGift, setSelectedGift] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sendTime, setSendTime] = useState("00:00");
  const [isFormValid, setIsFormValid] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [gender, setGender] = useState("all");
  const [channel, setChannel] = useState("push");
  const maxLength = 200;
  const remaining = maxLength - description.length;
  const isNearLimit = remaining <= 200; 

  useEffect(() => {
    const areBaseFieldsValid =
      mailingName.trim() !== "" &&
      title.trim() !== "" &&
      description.trim() !== "" &&
      selectedGift.trim() !== "";

    let areConditionalFieldsValid = true;

    if (type === "holiday") {
      areConditionalFieldsValid =
        publicationDate.trim() !== "" && endDate.trim() !== "";
    }

    if (type === "birthday") {
      areConditionalFieldsValid = sendTime.trim() !== "";
    }

    setIsFormValid(areBaseFieldsValid && areConditionalFieldsValid);
  }, [mailingName, title, description, selectedGift, publicationDate, endDate, sendTime, type]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleGiftSelect = (gift) => {
    setSelectedGift(gift);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex-1 px-6 max-w-[400px] overflow-y-auto custom-scrollbar">
      <form id="mailing-form" onSubmit={(e) => e.preventDefault()} className="space-y-5">

        <div>
          <label className={labelStyle}>Название рассылки<span className="color-accent">*</span></label>
          <input
            type="text"
            placeholder="Введите название рассылки"
            className={inputStyle}
            value={mailingName}
            onChange={(e) => setMailingName(e.target.value)}
          />
        </div>

        <div className="relative">
          <label className={labelStyle}>Заголовок<span className="color-accent">*</span></label>
          <input
            type="text"
            placeholder="Введите заголовок"
            className={`${inputStyle} pr-16`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="button" className="absolute right-3 top-9 text-xs bg-[rgba(80,80,80,1)] text-gray-300 rounded px-2 py-1">Имя</button>
        </div>

        <div className="relative">
          <label className={labelStyle}>
            Описание<span className="color-accent">*</span>
          </label>

          <textarea
            placeholder="Введите текст"
            rows="4"
            maxLength={maxLength}
            className={`${inputStyle} resize-y`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
            type="button"
            className="absolute right-3 bottom-8 text-xs bg-[rgba(80,80,80,1)] text-gray-300 rounded px-2 py-1"
          >
            Имя
          </button>

          <p
            className={`text-xs text-right mt-1 transition-colors duration-300 ${
              remaining <= 20 ? "text-red-400" : "text-gray-500"
            }`}
          >
            {isNearLimit
              ? `Осталось ${remaining} символов`
              : `${maxLength} символов`}
          </p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <label className={labelStyle}>Подарок<span className="color-accent">*</span></label>
          <input
            type="text"
            readOnly
            placeholder="Укажите вид поощрения"
            className={`${inputStyle} cursor-pointer`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            value={selectedGift}
          />
          <ChevronRight
            className={`absolute right-3 top-9 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : ''}`}
            size={20}
          />
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-full z-10">
              <SelectWithOptions
                data={promotionData}
                selectedValue={selectedGift}
                onChange={handleGiftSelect}
              />
            </div>
          )}
        </div>

        {type === "holiday" && (
          <>
            <RadioGroup
              label="Пол"
              name="gender"
              options={[
                { label: "Все", value: "all" },
                { label: "Мужской", value: "male" },
                { label: "Женский", value: "female" },
              ]}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="w-full sm:w-1/2">
                <label className={labelStyle}>Дата публикации<span className="color-accent">*</span></label>
                <input
                  type="date"
                  className={inputStyle}
                  value={publicationDate}
                  onChange={(e) => setPublicationDate(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/2 mt-5 sm:mt-0">
                <label className={labelStyle}>Дата окончания<span className="color-accent">*</span></label>
                <input
                  type="date"
                  className={inputStyle}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {type === "birthday" && (
          <div>
            <label className={labelStyle}>Время отправки<span className="color-accent">*</span></label>
            <input
              type="time"
              className={inputStyle}
              value={sendTime}
              onChange={(e) => setSendTime(e.target.value)}
            />
          </div>
        )}

        <RadioGroup
          label="Канал"
          name="channel"
          options={[
            { label: "Push уведомления", value: "push" },
            { label: "SMS сообщение", value: "sms" },
          ]}
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        />
      </form>
      <MailingFormFooter onClose={onClose} isFormValid={isFormValid} />
    </div>
  );
};

export default MailingFormBody;