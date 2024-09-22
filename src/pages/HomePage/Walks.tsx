import React, { useEffect, useState } from 'react';
import { WalkCard } from '../../components/WalkCard';
import { makeStyles } from '@fluentui/react-components';
import { deleteWalkAPI, getAllWalksAPI } from '../../Services/allAPI';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { AddNewWalk } from '../../components/AddNewWalk'; // Adjust the import path as necessary
import { useBoolean } from '@fluentui/react-hooks';
import { EditWalk } from '../../components/EditWalk';

const useStyles = makeStyles({
    cardCollection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        justifyContent: 'space-between',
        margin: '10px 30px',
    },
    addnew: {
        textAlign: 'end',
        marginRight: '30px',
    },
});

interface Walk {
    id: string;
    name: string;
    description: string;
    lengthInKm: string;
    walkImageUrl: string;
    difficulty: {
        code: string;
        id: string;
        name: string;
    };
    region: {
        id: string;
        name: string;
        code: string;
        regionImageUrl: string;
    };
}

const Walks: React.FC = () => {
    const [walks, setWalks] = useState<Walk[]>([]);
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false); // Panel state
    const [isEditOpen, { setTrue: openEditPanel, setFalse: dismissEditPanel }] = useBoolean(false);
    const [selectedWalk, setSelectedWalk] = useState<Walk | null>(null);
   
    const [id,setId] = useState<string>('')
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [lengthInKm, setLengthInKm] = useState<number>(50);
    const [walkImageUrl, setWalkImageUrl] = useState<string>('');
    const [difficultyId, setDifficultyId] = useState<string>('');
    const [regionId, setRegionId] = useState<string>('');
   
    console.log(isOpen);

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await getAllWalksAPI();
            setWalks(response.data);
        };
        fetchDetails();
    }, [isOpen, isEditOpen]);

    const handleEditClick = (walk: Walk) => {
        // setSelectedWalk(walk)
        setId(walk.id)
        setName(walk.name)
        setDescription(walk.description)
        setDifficultyId(walk.difficulty.id)
        setLengthInKm(Number(walk.lengthInKm))
        setRegionId(walk.region.id)
        setWalkImageUrl(walk.walkImageUrl)

        openEditPanel();
    }

    const handleDeleteClick = async (id: string) => {
        try {
            const response = await deleteWalkAPI(id);  // API call to delete the walk
            setWalks(prevWalks => prevWalks.filter(walk => walk.id !== id)); // Remove walk from state
        } catch (error) {
            console.error("Failed to delete the walk", error);
        }
    };


    const walkDetails = {
        id,
        name,
        description,
        difficultyId,
        regionId,
        lengthInKm,
        walkImageUrl
    }
    console.log(walkDetails);
    

    const styles = useStyles();
    return (
        <>
            <div className={styles.addnew}>
                <PrimaryButton text="Add New" allowDisabledFocus onClick={openPanel} />
            </div>
            <div className={styles.cardCollection}>
                {walks.map((walk) => (
                    <WalkCard
                        key={walk.id} // Ensure each WalkCard has a unique key
                        imageSrc="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
                        name={walk.name}
                        walkImageUrl={walk.walkImageUrl}
                        kilometers={walk.lengthInKm}
                        regionCode={walk.region.code}
                        description={walk.description}
                        regionName={walk.region.name}
                        onEdit={() => handleEditClick(walk)}
                        onDelete={() => handleDeleteClick(walk.id)} 
                    />
                ))}
            </div>
            <AddNewWalk isOpen={isOpen} onDismiss={dismissPanel} />
            {walkDetails && (
                <EditWalk
                    isOpen={isEditOpen}
                    onDismiss={dismissEditPanel}
                    walk={walkDetails}
                />
            )}
        </>
    );
};

export default Walks;
