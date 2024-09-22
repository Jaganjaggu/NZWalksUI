import { mergeStyleSets } from "@fluentui/react";

export const useRegisterStyles = mergeStyleSets({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    container: {
       
        width: '350px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f3f2f1',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
    },
    textfield: {
        width: '100%'
    },
    dropdown: {
        width: '100%',
    },
    button: {
        width: '100%',
        backgroundColor: '#0078d4',
        color: '#fff',
        selectors: {
            ':hover': {
                backgroundColor: '#005a9e',
            },
        },
    },
    title:{
        fontSize:'26px',
        display:'flex',
        justifyContent:'center',
        marginBottom: '20px',
        fontFamily: `'Arial', sans-serif`,
        fontWeight: 'bold'
    },
});