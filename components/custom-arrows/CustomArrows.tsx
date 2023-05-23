import styled from 'styled-components';
import Image from 'next/image';
import { useWindowSize } from '@/utils/use-window-size';

interface IStyledDiv {
    leftArrow: boolean;
    width: number;
    height: number;
    bottom: number | string;
    left?: number | string;
    right?: number | string;
    marginLeft?: string;
    marginRight?: string;
}

const StyledDiv = styled.div<any>(({ width, height, bottom, leftArrow, marginLeft, marginRight, left, right }) => ({
    height: width,
    width: height,
    bottom: bottom,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '50%',
    padding: '0.5rem',
    userSelect: 'none',
    zIndex: 10,
    marginLeft: leftArrow === true ? marginLeft : undefined,
    marginRight: leftArrow === true ? undefined : marginRight,
    left: leftArrow === true ? left : undefined,
    right: leftArrow === true ? undefined : right,
}));

export const LeftArrow = ({ onClick, alwaysBottom, ...rest }: any) => {
    const { width } = useWindowSize();
    const {
        onMove,
        carouselState: { currentSlide, deviceType },
    } = rest;
    return (
        <StyledDiv
            onClick={() => onClick()}
            leftArrow
            width={width && width < 800 ? 45 : 60}
            height={width && width < 800 ? 45 : 60}
            bottom={width && width < 800 ? '5px' : alwaysBottom ? '5px' : '50%'}
            left={0}
            marginLeft={width && width < 500 ? '1rem' : '3rem'}>
            <Image src={'/downArrow.svg'} width={30} height={20} alt='' style={{rotate: '90deg'}} />
        </StyledDiv>
    );
};


export const RightArrow = ({ onClick, alwaysBottom, ...rest }: any) => {
    const { width } = useWindowSize();
    const {
        onMove,
        carouselState: { currentSlide, deviceType },
    } = rest;
    return (
        <StyledDiv
            leftArrow={false}
            onClick={() => onClick()}
            width={width && width < 800 ? 45 : 60}
            height={width && width < 800 ? 45 : 60}
            bottom={width && width < 800 ? '5px' : alwaysBottom ? '5px' : '50%'}
            right={0}
            marginRight={width && width < 500 ? '1rem' : '3rem'}>
            <Image src={'/downArrow.svg'} width={30} height={20} alt='' style={{rotate: '-90deg'}} />
        </StyledDiv>
    );
};
