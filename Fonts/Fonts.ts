import localFont from 'next/font/local';

export const KoskoBold = localFont({
    src: '@/Fonts/KoskoBold.ttf',
    variable: '--ff-heading',
    display: 'swap',
});
export const KoskoRegular = localFont({
    src: '@/Fonts/KoskoRegular.ttf',
    variable: '--ff-body',
    display: 'swap',
});