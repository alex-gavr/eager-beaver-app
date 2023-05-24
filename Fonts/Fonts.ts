import localFont from 'next/font/local';

export const KoskoBold = localFont({
    src: './KoskoBold.ttf',
    variable: '--ff-heading',
    display: 'swap',
});
export const KoskoRegular = localFont({
    src: './KoskoRegular.ttf',
    variable: '--ff-body',
    display: 'swap',
});