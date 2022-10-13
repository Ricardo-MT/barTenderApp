import React from 'react';
import Icons, {IconProps} from './IconGallery/Index';

/**
 * @author Ricardo Mejias
 * @param icon Icon definintion type.
 * @param size Sets both height and width of this icon. Overrides any height/width values passed in styles.
 * @param style
 * @param color
 * @param secondaryColor
 */
const Icon : React.FC<IconProps> = (props) => {

    const LocalIcon = Icons[props.icon];


    return <LocalIcon {...props} />;
};

export default Icon;
