import React from "react";

export interface RealEstateIconProps extends React.SVGProps<SVGSVGElement> {}

const RealEstateIcon = React.memo(({ ...props }: RealEstateIconProps) => {
  return (
    <svg {...props} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.8009 7.80356V10.4669H15.1646L14.9835 10.4805L14.9343 10.4886C14.5522 10.5508 14.1069 10.7754 13.8724 11.2589C13.6458 11.7258 13.7327 12.1961 13.8954 12.5179L13.92 12.5666L14.3265 13.2108C12.7324 14.1462 11.5473 15.7418 11.2255 17.5889L11.2225 17.6062L11.22 17.6237C11.049 18.8206 11.1983 19.9683 11.5852 20.9656H2.27922C2.01782 20.9656 1.80566 20.7535 1.80566 20.4921V18.5978C1.80566 18.3364 2.01782 18.1243 2.27922 18.1243H3.6999V10.7623H1.80566V7.80356C1.80566 7.29117 2.08128 6.81855 2.52831 6.56662L10.3382 2.15685C10.6262 1.99394 10.9804 1.99394 11.2683 2.15685L19.0782 6.56662C19.5253 6.81855 19.8009 7.29117 19.8009 7.80356ZM12.2243 7.10363C12.2243 6.31847 11.5879 5.68296 10.8036 5.68296C10.0194 5.68296 9.38297 6.31847 9.38297 7.10363C9.38297 7.88785 10.0194 8.52431 10.8036 8.52431C11.5879 8.52431 12.2243 7.88785 12.2243 7.10363Z"
        fill="currentColor"
      />
      <path
        d="M12.843 20.9656C12.8997 21.0797 12.9603 21.1904 13.0245 21.2974C13.3092 21.677 13.7837 21.9617 14.2581 21.9617H20.8056L20.948 21.9522C21.374 21.9038 21.783 21.639 22.0392 21.2974C22.5137 20.6341 22.7983 19.6852 22.7983 18.7363C22.7983 16.4001 21.3209 14.433 19.2304 13.7431L20.3321 11.9981L20.3568 11.9355C20.4042 11.7685 20.3112 11.6185 20.1423 11.6185H15.208L15.1197 11.6252C15.0701 11.6333 15.0283 11.6485 14.9945 11.6692C14.8816 11.7382 14.8574 11.8682 14.9232 11.9982L16.0068 13.7157C15.5915 13.8465 15.1961 14.028 14.8288 14.252C13.5522 15.0307 12.6151 16.3231 12.3602 17.7866C12.1918 18.9651 12.397 20.069 12.843 20.9656Z"
        fill="currentColor"
      />
    </svg>
  );
});

export default RealEstateIcon;