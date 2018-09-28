

const borderColor = 'rgb(236, 240, 241)';
const borderColorLighter = 'rgb(240,240,240)';



const commons = {
    color:{
        default: 'rgba(40,40,40,.95)',
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
        borderColor: commons.borderColor.darker2,
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
        height: '40px',
        color: commons.color.default,
    },
    sideMenu:{
        width: '260px',
        backgroundColor: 'rgb(241, 242, 246)',
        borderColor: commons.borderColor.darker,
        color: commons.color.default,
    },
    zIndex:{
        dropdown: 1,
        loaderHoc: 2
    },
    ui:{
        button:{
            default:{
                color: 'rgb(90,90,90)',
                colorActive: 'rgb(30,30,30)',
                colorHover: 'rgb(45,45,45)',
                colorDisabled: 'rgba(77,77,77,.4)',
                
                borderColor: commons.borderColor.darker2,
                borderColorActive: commons.borderColor.darker3,
                
                backgroundColor: 'transparent', //initial
                backgroundColorHover: 'rgb(241, 242, 246)',
                backgroundColorActive: 'rgb(237, 238, 243)',



            },
            gray:{
                color: 'rgb(80,80,80)',
                colorActive: 'rgb(30,30,30)',
                colorHover: 'rgb(35,35,35)',
                colorDisabled: 'rgba(77,77,77,.4)',

                borderColor: commons.borderColor.darker2,
                borderColorActive: commons.borderColor.darker3,

                backgroundColor:  'rgb(239, 240, 245)', //'rgb(241, 242, 246)',
                backgroundHover:  'rgb(236, 237, 242)', 
                backgroundActive:  'rgb(233, 234, 239)', 

            },
        },
        field:{
            default:{

            }
        },
        link:{
            default:{},
            blue:{
                color:'#4183c4'
            }
        }
    }
}

export default theme;