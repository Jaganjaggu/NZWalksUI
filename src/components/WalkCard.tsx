import * as React from 'react';
import { Card, CardFooter, Image, Text, CardPreview, Body1, Caption1, Button } from '@fluentui/react-components';
import { useStyles } from './WalkCardStyle';
import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react';


interface WalkCardProps {
    imageSrc: string;
    name: string;
    kilometers: string;
    regionCode: string;
    description: string;
    regionName: string;
    walkImageUrl: string;
    onEdit: () => void;
    onDelete: () => void;
}

export const WalkCard: React.FC<WalkCardProps> = ({
    imageSrc,
    name,
    kilometers,
    regionCode,
    description,
    regionName,
    walkImageUrl,
    onEdit,
    onDelete,
}) => {
    const styles = useStyles();

    return (
        <Card className={styles.card}>
            <CardPreview>
                <Image src={imageSrc} alt={name} className={styles.image} />
            </CardPreview>

            <div className={styles.nameOverlay}>
                {name}
            </div>
            <CardFooter>
                <div className={styles.footer}>
                    <Text>{kilometers} km</Text>
                </div>
            </CardFooter>
            <Caption1 className={styles.region}>{regionName}</Caption1>

            <Body1 className={styles.description}>{description}</Body1>
            <DefaultButton text="Edit" onClick={onEdit} />

            {/* Delete button */}
            <PrimaryButton
                text="Delete"
                ariaLabel="Delete"
                onClick={onDelete}
            />
        </Card>
    );
};
