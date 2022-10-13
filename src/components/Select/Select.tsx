import React, { FunctionComponent, useState, useRef, useEffect, CSSProperties } from 'react';
import selectStyles from './Select.module.css';
import inputStyles from '../Input/inputStyles.module.css';
import Icon from '../Icon/Icon';
import gsap from 'gsap';

type Props = {
	label?: string;
	options: {value:string, name:string}[];
	defaultOption?:number;
	disabled?: boolean;
	onChange:(elementSelected:string) => void;
	style?:CSSProperties
};

/**
 * @version 1.0.0
 * @author Pepe
 * @param label Tipo string; Es la etiqueta por encima del select (justo igual que en el input). 
 * @param options Tipo {value:string, name:string}[]; Es un array de objetos de la forma {value:"1",name:"Enero"} por ejemplo. El value va ser lo que nos va devolver si seleccionamos esa opción y lo otro es lo que se va mostrar para seleccionar. 
 * @param defaultOption Tipo number; Es el índice del array options de la opción que queremos por defecto como seleccionada.
 * @param disabled Tipo boolean; Default:false; Propiedad que indica si está deshabilitado y quue provoca que no se pueda desplegar ni cambiar la seleccion.
 * @param onChange Tipo función; Dicha función va recibir el elemento que se haya seleccionado y se va disparar cada vez que cambiemos nuestra selección.
 * @param style tipo Objeto; Un objeto con las propiedades css que queremos imponerles a nuestro selector, tales como width, height, fontSize... Estas propiedades prevalecen sobre el resto.
 * @example <Select label={"mes"} options={[{value:"1", name:"Enero"},{value:"2", name:"Febrero"}]} onChange={(mesSeleccionado) => setMes(mesSeleccionado)} style={{width:'200px'}}/>
 */


const Select: FunctionComponent<Props> = (props) => {
	const [optionSelected, setOptionSelected] = useState<number | undefined>(props.defaultOption);
	const [openOptions, setOpenOptions] = useState<boolean>(false);
	const optionsRef  = useRef<HTMLDivElement>(document.createElement('div'));
	
	const handleSelectOption = (elementValue:string, index:number) => {
		if(!props.disabled){
			setOptionSelected(index);
			props.onChange(elementValue);
		}
	};

	const selectListener = (e : MouseEvent) => {
		setOpenOptions(false);
	}

	const handleClick = () => {
		if(!props.disabled){
			setOpenOptions(!openOptions);
		}
	}

	useEffect(() => {
		if(optionsRef.current){
			let scaleFinalPosition = openOptions ? 1 : 0;
			gsap.fromTo(optionsRef.current, {scale:0, autoAlpha:0}, {scale:scaleFinalPosition, autoAlpha:scaleFinalPosition,ease:'power1.out', duration:.1 });
		}
		
		openOptions ? document.addEventListener('click', selectListener) : document.removeEventListener('click', selectListener);
		
		return () => document.removeEventListener('click', selectListener);

	}, [openOptions]);

	return (
		<div className={`${selectStyles.selectContainer} ${props.disabled ? selectStyles.disabled : ""}`} style={props.style}>
			<label className={`${inputStyles.label} ${selectStyles.label}`}>{props.label}</label>
			<div>
				<div className={inputStyles.input} onClick={handleClick}>
					<span className={selectStyles.optionSelected}>{optionSelected != undefined ? props.options[optionSelected].name : "Selecciona una opción"}</span>
					<Icon icon={"ArrowDropdown"} size={10} />
				</div>
				{ <div className={selectStyles.optionsContainer} ref={optionsRef}>
					{props.options.map((option, i) => {
						return <div onClick={()=> handleSelectOption(option.value, i)} className={`${selectStyles.optionItem} ${i===optionSelected ? selectStyles.selected : ""}`}>
							{option.name}
						</div>
					})}
				</div>}
				
			</div>
		</div>
	);
};

export default Select;