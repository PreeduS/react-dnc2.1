
/*defaults*/
    //export const borderColorDarker2 = 'rgb(223, 230, 233)';
//export const borderColorDarker = 'rgb(230,230,230)';
const borderColor = 'rgb(236, 240, 241)';
const borderColorLighter = 'rgb(240,240,240)';



const commons = {
    color:{
        default: 'rgba(40,40,40,.9)',
        lighter: 'rgba(77,77,77,.95)',
        lighter2: 'rgba(110,110,110,.9)',
    },
    borderColor:{
        darker3: 'rgb(220,220,220)',
        darker2: 'rgb(223, 230, 233)',
        darker: 'rgb(230,230,230)',
        default:''
    }
}

const theme = {
    commons,
    mainContainer:{
        borderColor: commons.borderColor.darker2,//borderColorDarker2,
        borderColorLighter: borderColorLighter,
        backgroundColor: '#F5F6FA',    /*rgb(245, 246, 250)*/
        color: commons.color.default,
        content:{
            marginLeft: '20px',
            marginRight: '20px',
            marginTop: '30px'
        }
    },
    topMenu:{
        borderColor: commons.borderColor.darker3,
        backgroundColor: 'rgb(250, 250, 250) ',     //rgb(250, 250, 250)   //#FAFAFA'
        height: '40px'
    },
    sideMenu:{
        width: '260px',
        backgroundColor: 'rgb(241, 242, 246)',
        borderColor: commons.borderColor.darker  //borderColorDarker
    },
    zIndex:{
        dropdown: 1,
        loaderHoc: 2
    },
    button:{
        default:{
            borderColor: commons.borderColor.darker2,
            color: commons.color.lighter,
            colorActive: 'rgb(30,30,30)',
            colorHover: 'rgb(40,40,40)',
            colorDisabled: 'rgba(77,77,77,.4)',

            backgroundColorHover: 'rgb(241, 242, 246)',
            backgroundColorActive: 'rgb(237, 238, 243)',



        },
        gray:{

            colorActive: 'rgb(30,30,30)',
            colorHover: 'rgb(35,35,35)',
            colorDisabled: 'rgba(77,77,77,.4)',

        },
    }
}

export default theme;