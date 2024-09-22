import React, { useEffect, useState } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { updateWalkAPI, getAllRegionsAPI } from '../Services/allAPI'; // Import the updateWalkAPI
import {
    TextField,
    Dropdown,
} from '@fluentui/react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    saveButton: {
        display: 'flex',
        gap: '20px',
        marginTop: '20px'
    }
})

interface EditWalkFormProps {
    isOpen: boolean;
    onDismiss: () => void;
    walk: Walk; // The walk to be edited
}

interface Walk {
    id: string;
    name: string;
    description: string;
    lengthInKm: number;
    walkImageUrl: string;
    difficultyId: string;
    regionId: string;
}

interface Region {
    id: string;
    code: string;
    name: string;
    regionImageUrl: string;
}

interface Difficulty {
    id: string;
    name: string;
}

const difficulties: Difficulty[] = [
    { id: '54466F17-02AF-48E7-8ED3-5A4A8BFACF6F', name: 'Easy' },
    { id: 'EA294873-7A8C-4C0F-BFA7-A2EB492CBF8C', name: 'Medium' },
    { id: 'F808DDCD-B5E5-4D80-B732-1CA523E48434', name: 'Hard' },
];

export const EditWalk: React.FC<EditWalkFormProps> = ({ isOpen, onDismiss, walk }) => {
    const [name, setName] = useState<string>(walk.name);
    const [description, setDescription] = useState<string>(walk.description);
    const [lengthInKm, setLengthInKm] = useState<number>(walk.lengthInKm);
    const [walkImageUrl, setWalkImageUrl] = useState<string>(walk.walkImageUrl);
    const [difficultyId, setDifficultyId] = useState<string>(walk.difficultyId);
    const [regionId, setRegionId] = useState<string>(walk.regionId);

    const [regions, setRegions] = useState<Region[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty[]>(difficulties);

    useEffect(() => {
        setName(walk.name);
        setDescription(walk.description);
        setLengthInKm(walk.lengthInKm);
        setWalkImageUrl(walk.walkImageUrl);
        setDifficultyId(walk.difficultyId);
        setRegionId(walk.regionId);
    }, [walk]);

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await getAllRegionsAPI();
            setRegions(response.data);
        };
        fetchDetails();
    }, []);

    const handleClose = () => {
        onDismiss(); // Dismiss panel
    };
    console.log("editWalkPage : ", walk.id);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updatedWalk = {
            name,
            description,
            lengthInKm,
            walkImageUrl,
            difficultyId,
            regionId,
        };
        console.log(updatedWalk);
        

        const response = await updateWalkAPI(walk.id,updatedWalk); // Call API to update walk
        console.log(response.data);

        onDismiss();
    };

    const styles = useStyles();

    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onDismiss}
            headerText="Edit Walk Details"
            closeButtonAriaLabel="Close"
            isFooterAtBottom={true}
        >
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Walk Name"
                        value={name}
                        onChange={(e, newValue) => setName(newValue || '')}
                        required
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e, newValue) => setDescription(newValue || '')}
                        required
                        multiline
                    />
                    <TextField
                        label="Length in Km"
                        type="number"
                        value={lengthInKm.toString()}
                        onChange={(e, newValue) => setLengthInKm(Number(newValue))}
                        required
                    />
                    <TextField
                        label="Walk Image URL"
                        value={walkImageUrl}
                        onChange={(e, newValue) => setWalkImageUrl(newValue || '')}
                    />
                    <Dropdown
                        label="Select Difficulty"
                        selectedKey={difficultyId}
                        onChange={(e, option) => setDifficultyId(option?.key as string)}
                        options={selectedDifficulty.map(d => ({
                            key: d.id,
                            text: d.name,
                        }))}
                        required
                    />
                    <Dropdown
                        label="Select Region"
                        selectedKey={regionId}
                        onChange={(e, option) => setRegionId(option?.key as string)}
                        options={regions.map(r => ({
                            key: r.id,
                            text: r.name,
                        }))}
                        required
                    />
                    <div className={styles.saveButton}>
                        <PrimaryButton text="Save" type="submit" />
                        <DefaultButton onClick={handleClose}>Cancel</DefaultButton>
                    </div>
                </form>
            </div>
        </Panel>
    );
};
