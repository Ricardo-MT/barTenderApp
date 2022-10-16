import React, { FunctionComponent, useContext, useEffect, useRef } from 'react';
import notificationStyles from './Notification.module.css';
import gsap from 'gsap';
import { NotificationContext } from '../../utils/contexts/notificationContext';

let timeout : any = null;

type Props = {
    style?:React.CSSProperties,
}

const Notification : FunctionComponent<Props> = ({style}) => {

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

    return notification && <div ref={notificationRef} className={notificationStyles.notification} style={Object.assign({},{color:notification.type === "success" ? "var(--statusSuccess)" : "var(--statusError)"}, style)}>
        <span>{notification.text}</span>
    </div>
}

export default Notification;