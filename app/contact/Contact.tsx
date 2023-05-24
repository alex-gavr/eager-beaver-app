'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import cloud from '@/images/clouds/1.svg';
import cloud2 from '@/images/clouds/2.svg';
import cloud3 from '@/images/clouds/3.svg';
import { CloudContainer } from '@/components/CloudsContainer';
import { useAppSelector } from '@/services/hook';
import Loader from '@/components/Loader';
import { StyledMain, StyledSection } from '@/styles/StyledMain';
import { ContactDetails, Grid, Heading, IconsContainer, SubHeading } from './styles';

const SchoolLocationMap = dynamic(() => import('@/components/map/map'));
const SocialMediaIcons = dynamic(() => import('@/components/social-media-block/SocialMediaIcons'));
const PageAnimation = dynamic(() => import('@/components/page-animation/PageAnimation'));

const Contact = () => {
  const { showLoader } = useAppSelector((state) => state.homeLoader);

  return (
    <>
      {showLoader && <Loader title='Контакты' layoutId='contact' />}
      <StyledMain>
        <StyledSection>
          <Grid>
            <SchoolLocationMap
              style={{ order: 2 }}
              widthDesktop={550}
              heightDesktop={550}
              widthMobile={300}
              heightMobile={300}
            />
            <ContactDetails>
              <Heading layoutId='contact' transition={{ duration: 0.6, ease: 'easeOut' }}>
                Контакты
              </Heading>
              <p> г. Волгоград, БЦ &quot;Меркурий&quot;, ул. Калинина, д. 13, 8-й этаж, офис 807 </p>
              <p>
                Телефон для связи: <a href='tel:+7(909)380-96-57'>+7(909)380-96-57</a>
              </p>
              <SubHeading>Соцсети</SubHeading>
              <IconsContainer>
                <SocialMediaIcons />
              </IconsContainer>
            </ContactDetails>
            <CloudContainer top={0} left={0} animate={{ x: -40 }}>
              <Image src={cloud} alt='' />
            </CloudContainer>
            <CloudContainer top={0} right={'10%'} height={150} width={150} animate={{ y: -40 }}>
              <Image src={cloud2} alt='' />
            </CloudContainer>
            <CloudContainer bottom={'10%'} right={'5%'} height={100} width={100} animate={{ y: 40 }}>
              <Image src={cloud3} alt='' />
            </CloudContainer>
          </Grid>
        </StyledSection>
      </StyledMain>
    </>
  );
};
export default Contact;
