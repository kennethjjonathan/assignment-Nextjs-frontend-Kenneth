import React, { Dispatch, SetStateAction } from "react";
import ModalBase from "./ModalBase";
import SelectOptions from "./SelectOptions";
import DateInput from "./DateInput";

type FilterTransactionModalProps = {
  statusOptionArr: string[];
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function FilterTransactionModal({
  statusOptionArr,
  status,
  setStatus,
  date,
  setDate,
  isOpen,
  setIsOpen,
}: FilterTransactionModalProps) {
  return (
    <ModalBase isOpen={isOpen}>
      <div className="w-3/4 py-3 bg-smokewhite-custom rounded-xl">
        <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl">
          <p>Filter Setting</p>
          <button
            className="text-blue-500 duration-300 hover:text-blue-800 active:text-blue-950"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        <div className="w-full px-3 py-3 h-auto">
          <SelectOptions
            label="By Status"
            optionArr={statusOptionArr}
            inputValue={status}
            setInputValue={setStatus}
          />
          <DateInput
            label="By Date"
            id="transaction-date"
            inputValue={date}
            setInputValue={setDate}
          />
        </div>
      </div>
    </ModalBase>
  );
}

export default FilterTransactionModal;
