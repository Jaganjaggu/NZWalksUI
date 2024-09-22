import React, { useEffect, useState } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { addWalkAPI, getAllRegionsAPI } from '../Services/allAPI';
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

interface PanelProps {
    isOpen: boolean;
    onDismiss: () => void;
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


export const AddNewWalk: React.FC<PanelProps> = ({ isOpen, onDismiss }) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [lengthInKm, setLengthInKm] = useState<number>(50);
    const [walkImageUrl, setWalkImageUrl] = useState<string>('');
    const [difficultyId, setDifficultyId] = useState<string>('');
    const [regionId, setRegionId] = useState<string>('');

    const [regions, setRegions] = useState<Region[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty[]>(difficulties);
    // console.log("Regions are: ", regions);
    // console.log("Difficulties are: ", selectedDifficulty);

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await getAllRegionsAPI();
            setRegions(response.data);
        };
        fetchDetails();
    }, []);

    const handleClose = () => {
        setDescription('');
        setDifficultyId('');
        setLengthInKm(0);
        setName('');
        setRegionId('');
        setWalkImageUrl('');

        onDismiss()
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const walkDetails = {
            name,
            description,
            lengthInKm,
            walkImageUrl,
            difficultyId,
            regionId,
        };

        const response = await addWalkAPI(walkDetails)
        // console.log(response.data);

        setDescription('');
        setDifficultyId('');
        setLengthInKm(0);
        setName('');
        setRegionId('');
        setWalkImageUrl('');

        onDismiss()
    };

    const styles = useStyles();
    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onDismiss}
            headerText="New Walk Details"
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
