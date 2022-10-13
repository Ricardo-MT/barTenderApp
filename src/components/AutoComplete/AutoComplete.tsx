import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { IconDefinition } from '../Icon/IconGallery/Index';
import autoStyles from "./Autocomplete.module.css";
import Icon from '../Icon/Icon';

type Props = {
    suggestions: string[],
    selectAction: (selected : string) => void,
    defaultValue?: string,
    icon?: IconDefinition,
    placeholder?: string,
    canCreate?: boolean,
    disabled?: boolean,
    reset?: number,
    stayText?: boolean,
    style?: {},
    onChange?: () => void
}

const Autocomplete: FunctionComponent<Props> = ({ defaultValue, suggestions, selectAction, icon, placeholder, canCreate = false, stayText = false, disabled = false, reset = 0, style, onChange }) => {

    let [filteredList, setFilteredList] = useState<string[]>([]);
    let [value, setValue] = useState<string>('');
    let [showList, setShowList] = useState<boolean>(false);
    let [optionFocused, setOptionFocused] = useState<number>(0);

    useEffect(() => {
        setValue('')
        setOptionFocused(0)
        setShowList(false)
        setFilteredList([])
    }, [reset]);

    useEffect(() => {
        if(defaultValue || defaultValue === '' )
            setValue(defaultValue);
    }, [defaultValue]);

    const filter = (value : string) => {
        if (!showList) setShowList(true);
        const filtered = suggestions.filter(x => {
            return x.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(value ? value.toLowerCase() : '')
        });
        if (canCreate && filtered.length === 0)
            filtered.push(value);
        setFilteredList(filtered)
    };

    const handleChange = (event : React.ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setValue(value);
        filter(value);
        if (onChange) {
            onChange();
        }
    };

    const handleClick = (option? : string) => {
        const optionSelected = option ? option : filteredList[optionFocused]
        setValue(optionSelected);
        selectAction(optionSelected);
        setShowList(false);
        setOptionFocused(-1);
    };


    const handleKey = (e : React.KeyboardEvent) => {
        let target = e.currentTarget.tagName;
        let container = e.currentTarget.nextElementSibling;
        if (target === 'INPUT' && e.key === 'ArrowDown') {
            if (optionFocused + 1 < filteredList.length) {
                setOptionFocused(optionFocused + 1);
                let el = document.querySelectorAll('.suggestion__option')[optionFocused + 1] as HTMLElement;
                if ((el.offsetTop + el.offsetHeight) > (container as HTMLElement).offsetHeight) {
                    (container as HTMLElement).scrollTop = (container as HTMLElement).scrollTop + el.offsetHeight;
                }
            }
        }
        if (target === 'INPUT' && e.key === 'ArrowUp') {
            if (optionFocused - 1 >= -1) {
                setOptionFocused(optionFocused - 1);
                let el = document.querySelectorAll('.suggestion__option')[optionFocused - 1] as HTMLElement;
                if (el && (el.offsetTop < (container as HTMLElement).scrollTop)) {
                    (container as HTMLElement).scrollTop = (container as HTMLElement).scrollTop - el.offsetHeight;
                }
            }
        }
        if (target === 'INPUT' && e.key === 'Enter') {
            handleClick();
        }
        if (e.key === 'Tab') {
            handleBlur();
        }
    };

    const wrapperRef = useRef<null | HTMLDivElement>(null);

    const handleBlur = () => {
        if (showList) {
            if (!stayText) setValue('');
            else selectAction(value)
            setFilteredList([]);
            setShowList(false)
        }
    };
    function useOutsideAlerter(ref : React.MutableRefObject<null | HTMLDivElement>) {
        function handleClickOutside(event : any){
            if (ref.current && !ref.current.contains(event.target)) {
                handleBlur()
            }
        }
        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        });
    };
    useOutsideAlerter(wrapperRef);

    return (
        <div ref={wrapperRef} className={autoStyles.container} style={style}>
            {icon && <Icon icon={icon} className={autoStyles.iconElement} />}
            <input disabled={disabled} onFocus={() => filter(value)} type={'text'} value={value} placeholder={placeholder} onChange={handleChange} className={`${autoStyles.input} ${icon ? autoStyles.inputIcon : ''}`} onKeyDown={handleKey} />
            <div className={autoStyles.suggestionsContainer} id={'options-container'}>
                {showList && filteredList.map((option, i) => {
                    return <div key={i} onClick={() => handleClick(option)} className={`${autoStyles.option} ${optionFocused === i ? autoStyles.focused : ''} suggestion__option`}>{option}</div>
                })}
            </div>
        </div>
    );
};
export default Autocomplete;