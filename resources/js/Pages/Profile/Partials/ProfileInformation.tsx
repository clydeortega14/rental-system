import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import defaultAvatar from '@/../../resources/img/img1.jpg';
import notVerified from '@/../../resources/img/notVerifiedv1.png';
import Verified from '@/../../resources/img/verified.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import { PageProps } from '@/types';

// Sample user data
const user = {
    name: 'Angelica U Belarma',
    address: 'Philippines',
    email: 'angelicabelarma20@gmail.com',
    status: 'Active', // or any other status
    avatarUrl: defaultAvatar, // URL of the avatar image
    bio: 'With a tireless work ethic and a commitment to excellence, Me continues to make their mark on the industry, inspiring others with their creativity, innovation, and passion for the art of rendering.'
};

const InputLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
}));

export default function ProfileInformation({ className = '' }) {
    return (
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'center', sm: 'flex-start' }} className={className}>
            <Avatar alt="Avatar" src={user.avatarUrl} sx={{ width: 250, height: 250, marginRight: { xs: 0, sm: 1 }, marginLeft: { xs: 0, sm: 2 } }} />
            <Box flex={1} ml={{ xs: 0, sm: 2 }}>
                <Box mt={{ xs: 5, sm: 0 }} ml={{ xs: 0, sm: 8 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={3}>
                            <InputLabel>Name:</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography>{user.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <InputLabel>Address:</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography>{user.address}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <InputLabel>Email:</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography>{user.email}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <InputLabel>Status:</InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography>{user.status}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} mt={{ xs: 2, sm: 0 }}>
                            {/* Add social media icons with links */}
                            <a href="https://www.facebook.com">
                                <FacebookIcon />
                            </a>
                            <a href="https://www.google.com">
                                <GoogleIcon />
                            </a>
                            <a href="https://www.instagram.com">
                                <InstagramIcon  />
                            </a>
                        </Grid>
                    </Grid>
                </Box>
                <Typography mt={5} ml={{ xs: 0, sm: 8 }} variant="body1" color="textSecondary">
                    "{user.bio}"
                </Typography>
            </Box>
            <Avatar alt="Image 1" src={Verified} sx={{ width: 140, height: 120, marginRight: { xs: 0, sm: -55 } }} />
        </Box>
    );
}
