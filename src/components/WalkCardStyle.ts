import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
    card: {
        width: '300px',
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', 
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#fff',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        position:'absolute',
        top: '150px',
        right: '15px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize:'12px'
    },
    nameOverlay: {
        width:'100%',
        textAlign:'center',
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform:'translateX(-50%)',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to make text more readable
        padding: '10px 10px',
        borderRadius: '5px',
    },
    region:{
        textAlign: 'center',
        fontFamily:'cursive',
        marginBottom:'10px',
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    description:{
        fontFamily:'sans-serif'

    },
   
});