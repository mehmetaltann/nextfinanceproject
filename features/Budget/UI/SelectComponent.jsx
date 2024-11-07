import React, { useLayoutEffect, useRef } from "react";
import Select from "react-select";

const SelectComponent = React.memo(
  ({ active, rowData, setRowData, focus, stopEditing, columnData }) => {
    const ref = useRef(null);

    useLayoutEffect(() => {
      if (focus) {
        ref.current?.focus();
      } else {
        ref.current?.blur();
      }
    }, [focus]);

    return (
      <Select
        ref={ref}
        styles={{
          container: (provided) => ({
            ...provided,
            flex: 1,
            alignSelf: "stretch",
            pointerEvents: focus ? undefined : "none",
          }),
          control: (provided) => ({
            ...provided,
            height: "100%",
            border: "none",
            boxShadow: "none",
            background: "none",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          indicatorSeparator: (provided) => ({
            ...provided,
            opacity: 0,
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
          placeholder: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
        }}
        isDisabled={columnData.disabled}
        value={
          columnData.choices.find(({ value }) => value === rowData) ?? null
        }
        menuPortalTarget={document.body}
        menuIsOpen={focus}
        onChange={(choice) => {
          if (choice === null) return;

          setRowData(choice.value);
          setTimeout(stopEditing, 0);
        }}
        onMenuClose={() => stopEditing({ nextRow: false })}
        options={columnData.choices}
      />
    );
  }
);

export default SelectComponent;
