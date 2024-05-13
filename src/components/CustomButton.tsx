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
            <img src={icon} alt={icon} style={{height: '14px', width: '14px', objectFit: 'cover'}} />
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
