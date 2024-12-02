const styles = {
  boxWidth: 'xl:max-w-[1280px] w-full',
  boxShadow: 'shadow inset',
  inputArea:
    'px-2 py-2 bg-transparent text-[14px] text-blueblack font-semibold border-infoblack hover:border-secondary hover:bg-boxlightblue focus:bg-boxlightblue rounded-[6px]',

  saveBtn: 'bg-secondary hover:bg-primary hover:text-secondary',

  labelStyle: 'py-2 font-trip font-semibold text-blueblack text-[16px]',

  hero: 'font-merri font-bold xs:text-[70px] text-[70px] text-highblack xs:leading-[76.8px] leading-[66.8px] w-full',
  heading2:
    'font-merri font-bold xs:text-[32px] text-[32px] text-highblack xs:leading-[76.8px] leading-[66.8px] w-full',
  paragraph:
    'font-inter font-normal text-highblack text-[18px] leading-[30.8px]',
  sideTitle: 'font-inter font-medium text-highblack text-[18px] leading-[30px]',
  calendarDate:
    'font-inter font-semibold text-highblack text-[16px] leading-[20px]',
  plannerDate: 'font-inter font-semibold text-[16px] text-highblack',

  searchText: 'font-inter font-semibold text-highblack text-sm leading-[80px]',
  searchBox:
    'bg-primary h-12 rounded-[8px] relative mx-[10px] flex cursor-pointer',
  searchBtn:
    'bg-secondary h-12 rounded-[5px] relative mx-[10px] flex cursor-pointer border border-secondary',

  icon: 'w-[18px] h-[18px] justify-center items-center mx-[20px] relative flex',
  sideIcon: 'w-[25px] h-[25px] justify-start ml-[25px] relative flex',
  pIcon: 'w-[35px] h-[35px] justify-start ml-[20px] relative flex',
  addIcon:
    'stroke-bgblue hover:stroke-secondary duration-[.6s] cursor-pointer mt-1',

  flexCenter: 'flex justify-center items-center',
  flexStart: 'flex justify-center items-start',
  flexEnd: 'flex justify-end items-end',

  paddingX: 'sm:px-10 px-20',
  paddingY: 'sm:py-16 py-6',
  padding: 'sm:px-16 px-6 sm:py-12 py-4',

  marginX: 'sm:mx-16 mx-6',
  marginY: 'sm:my-16 my-6',
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
