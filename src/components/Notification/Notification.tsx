import React, { FunctionComponent, useContext, useEffect, useRef } from 'react';
import notificationStyles from './Notification.module.css';
import gsap from 'gsap';
import { NotificationContext } from '../../utils/contexts/notificationContext';

let timeout : any = null;

type Props = {
    style?:React.CSSProperties,
}

/**
 * 
 * @param type Tipo string comprendido entre "error" | "success"; Para error y éxito respectivamente; 
 * @param tex Tipo string; El texto de la notificación.
 * @param style Tipo {} de propiedades css. Estos estilos se pondrán sobre el contenedor padre, es decir, podemos determinar la posicion (fixed, absolute), el tamaño, etc...
 * @example <Notification type="error" text="Algo ha salido mal" style={{position:'fixed', right:0, top:0}}/>
 * @example <Notification type="success" text="Algo ha salido bien" style={{position:'fixed', left:0, top:0, width:'100px'}}/>
 * @returns 
 */
const Notification : FunctionComponent<Props> = (props) => {

    const notificationRef = useRef(null);
    const {notification, setNotification} = useContext(NotificationContext);

    useEffect(() => {
        if(timeout){
            clearTimeout(timeout);
            gsap.killTweensOf(notificationRef.current)
        }
        if(notification!=null){
            if(notificationRef.current){
                gsap.fromTo(notificationRef.current, {opacity:0, y:-50}, {opacity:1, y:0,duration:.5, ease:'power3.out', onComplete: ()=> {
                    if(notificationRef.current){
                        timeout = setTimeout(()=>{
                            gsap.to(notificationRef.current, {duration:.5, ease:'power3.in', y:-50, opacity:0, onComplete: () => {
                                setNotification(null);
                            }});
                        }, 1200);
                    }
                }});
            }
        }
    }, [notification])

    return notification && <div ref={notificationRef} className={notificationStyles.notification} style={Object.assign({},{color:notification.type === "success" ? "var(--statusSuccess)" : "var(--statusError)"}, props.style)}>
        <span>{notification.text}</span>
    </div>
}

export default Notification;