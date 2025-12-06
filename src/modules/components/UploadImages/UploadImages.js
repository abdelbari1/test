import React from 'react';
import { Grid, IconButton, Box, Tooltip, Skeleton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import useStyles from './UploadImages.styles'
import { CloudUpload } from '@mui/icons-material'
import Button from '../StyledButton/StyledButton'
import global from '../../global'
import ItemAPI from '../../apis/Item.api'
import { useSnackbar } from 'notistack';

export default function UploadImages(props) {

    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = React.useState(true)
    const { formik, editMode } = props
    const classes = useStyles()
    const [images, setImages] = React.useState(formik.values['image_details'])

    const handleImagesReader = (files) => {
        const imagesFile = [], fileReaders = []
        let isCancel = false
        files.forEach(file => {
            const fileReader = new FileReader();
            fileReaders.push(fileReader);
            fileReader.onload = function (e) {
                const { result } = e.target
                if (result) imagesFile.push(global.methods.imagePyBase64Js(result));
                if (files.length === imagesFile.length && !isCancel) {
                    setImages([...images, ...imagesFile])
                    formik.setFieldValue('image_details', [...formik.values['image_details'], ...imagesFile])
                }
            }

            fileReader.readAsDataURL(file)
        })
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }
    const onImageUpload = event => {
        let imagesReader = []
        if (event.target.files.length) {
            const files = event.target.files
            for (let i = 0; i < files.length; i++) {
                imagesReader.push(files[i])
            }
            if (imagesReader.length === files.length) handleImagesReader(imagesReader)
        }
    }

    const handleRemoveImage = (e, img) => {
        e.preventDefault();
        const filtersImages = images.filter(im => im !== img)
        setImages(filtersImages)
        formik.setFieldValue('image_details', [...filtersImages])
    }

    const handleImages = React.useCallback(() => {
        ItemAPI.getImagesItem(formik.values['image_details'])
            .then(res => { formik.setFieldValue('image_details', res.map(r => r.data)); setImages(res.map(r => r.data)) })
            .catch(err => enqueueSnackbar('Failed to load image details', { variant: 'error' }))
            .finally(() => setLoading(false))
    }, [])

    React.useEffect(() => editMode ? handleImages() : setLoading(false), [handleImages])

    return (
        <Grid container justifyContent='flex-start' spacing={1}>
            <React.Fragment>
                {loading ? <Skeleton variant='rectangle' height={'220px'} width={'100%'} />
                    :
                    <>
                        {images?.length > 0 && images.map((image, index) => (
                            <Grid key={index} item xs={12} >
                                <div className={classes.content}>
                                    <Box
                                        component={'img'}
                                        src={global.methods.imageBase64Js(image)}
                                        className={classes.image}
                                        alt={`image-${index}`}
                                    />
                                    <Tooltip title='Remove Image'>
                                        <Box className={classes.iconBar}>
                                            <IconButton
                                                onClick={(e) => handleRemoveImage(e, image)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Tooltip>
                                </div>
                            </Grid>
                        ))}
                    </>
                }
                <Grid item xs={12} >
                    <input
                        accept='image/*'
                        className={classes.uploadInput}
                        multiple
                        id='image_details'
                        type='file'
                        name='image_details'
                        onChange={onImageUpload}
                    />

                    <label htmlFor='image_details' >
                        <Button
                            component='span'
                            endIcon={<CloudUpload />}
                            focusRipple
                            className={classes.image}
                        >
                            Upload Image Details
                        </Button>
                    </label>
                </Grid>
            </React.Fragment>
        </Grid >
    )


}