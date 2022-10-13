import React from 'react';
import Icons, {IconProps} from './IconGallery/Index';

/**
 * @author Papo
 * @param icon Tipo string. Definicón de ícono a utilizar. Por defecto el logo de Fidias.
 * @param size Tipo number. Aplica al width y al height su valor, haciéndolo cuadrado. Tiene preferencia sobre el prop "style", por lo que su uso anula los valores de width y height del "style" pasado.
 * @param style Estilos css.
 * @param color Tipo string. Color a utilizar.
 * @param secondaryColor Tipo string. No todos los íconos lo utilizan, para efectuar algún cambio: ir a la carpeta IconGallery, buscar el ícono y modificar los atributos del svg para usar el secondaryColor.
 * @returns 
 */
const Icon : React.FC<IconProps> = (props) => {

    const LocalIcon = Icons[props.icon];


    return <LocalIcon {...props} />;
};

export default Icon;
