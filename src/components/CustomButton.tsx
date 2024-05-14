import { Avatar } from '@mui/material';
import React from 'react'
interface CustomButtonProps {
    title: string;
    showIcons? : boolean;
    icons?: string[];
    onClickAction?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({title, showIcons = true, icons, onClickAction}) => {
    const imageIcon = (icon: string) => {
        return (
            <Avatar 
                style={{
                    height: '24px', 
                    width: '24px', 
                    marginRight: '12px', 
                    opacity: 0.7
                }} 
                alt={`${icon}`} src={icon} 
            />
        )
    }
    return (
        <button className='button secondary-btn flex-content' onClick={onClickAction}> 
            {icons && icons.map(icon => imageIcon(icon))}
            {title}
        </button>
    )
}

export default CustomButton
