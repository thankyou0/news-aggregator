import React, { useEffect, useRef, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Tooltip, Zoom, IconButton } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { POST } from '../api'; 
import { alertContext } from '../context/alert/alert';
import HeartIcon from '@mui/icons-material/Favorite';
import HeartBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareButton from '@mui/icons-material/Share';
import ShareDialog from './ShareDialog';

const NewsCard = (props) => {
  const { mode } = useContext(ThemeContext);
  const { showAlert } = useContext(alertContext);
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';

  const handleClick = () => {
    window.open(props.link, '_blank');
  };

  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const shareDialogRef = useRef(null);

  useEffect(() => {
    (async () => {
      const ArticleDetails = { title: props.title, link: props.link };

      const result = await POST('/api/userdo/isBookmarked', ArticleDetails);
      if (result.data.success) {
        setBookmarked(result.data.bookmarked);
      }
    })();
  }, [props.title, props.link]);

  useEffect(() => {
    (async () => {
      const ArticleDetails = { title: props.title };

      const result = await POST('/api/userdo/isLiked', ArticleDetails);
      if (result.data.success) {
        setLiked(result.data.liked);
      }
    })();
  }, [props.title]);

  const handleBookmarkClick = async () => {
    setBookmarked(!bookmarked);
    const ArticleDetails = { title: props.title, link: props.link, imgURL: props.imgURL, providerName: props.providerName, providerImg: props.providerImg, time: props.time, someText: props.someText };

    const result = bookmarked
      ? await POST('/api/userdo/deleteBookmark', ArticleDetails)
      : await POST('/api/userdo/addBookmark', ArticleDetails);

    if (result.data.success) {
      showAlert(bookmarked ? "Article Unsaved Successfully" : "Article Saved Successfully", "success");
    } else {
      showAlert(result.data.message, "error");
    }
  };

  const handleLikeClick = async () => {
    setLiked(!liked);
    const result = liked
      ? await POST('/api/userdo/deleteLike', { title: props.title })
      : await POST('/api/userdo/addLike', { title: props.title });

    if (result.data.success) {
      showAlert(liked ? "Article UnLiked Successfully" : "Article Liked Successfully", "success");
    } else {
      showAlert(result.data.message, "error");
    }
  };

  const handleClickOutside = (event) => {
    if (shareDialogRef.current && !shareDialogRef.current.contains(event.target)) {
      setShowShareDialog(false);
    }
  };

  useEffect(() => {
    if (showShareDialog) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareDialog]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 900,
        margin: '20px auto',
        position: 'relative',
        '&:hover .action-buttons': {
          opacity: 1,
          visibility: 'visible',
        },
      }}
    >
      {/* Card Wrapper to Control Width */}
      <Box
        sx={{
          flex: 1,
          maxWidth: 850,
          marginRight: 2,
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: 'none',
            boxShadow: 'none',
            width: '100%',
            backgroundColor: mode === 'light' ? 'rgb(246  , 246 , 246  )' : 'rgb(50, 50, 50)',
            '&:hover': {
              backgroundColor: mode === 'light' ? 'rgb(240, 240, 240)' : 'rgb(60, 60, 60)',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardContent sx={{ flex: 1 }}>
              {/* Provider Image and Name */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                  height: '40px',
                  overflow: 'hidden',
                }}
              >
                {isSearchPage ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {props.providerImg && (
                      <img
                        src={props.providerImg}
                        alt="Provider Logo"
                        style={{
                          maxWidth: '40px',
                          maxHeight: '40px',
                          objectFit: 'contain',
                        }}
                      />
                    )}
                    {props.providerName && (
                      <Typography variant="subtitle2" color="text.secondary" style={{ marginLeft: '10px' }}>
                        {props.providerName}
                      </Typography>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    {props.providerImg && (
                      <img
                        src={props.providerImg}
                        alt="Provider Logo"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '80%',
                          objectFit: 'contain',
                        }}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Title with Tooltip */}
              <Tooltip title="click" placement="top" TransitionComponent={Zoom} arrow>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  onClick={handleClick}
                  sx={{
                    cursor: 'pointer',
                    color: 'rgb(30, 144, 255)',
                    '&:hover': { color: mode === 'light' ? 'blue' : 'white' },
                  }}
                >
                  {props.title}
                </Typography>
              </Tooltip>

              {/* Some Text */}
              {props.someText && (
                <Typography variant="body2" color="text.secondary">
                  {props.someText}
                </Typography>
              )}
            </CardContent>

            {/* Article Image */}
            {props.imgURL && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                <img
                  src={props.imgURL}
                  alt="Article"
                  style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
                />
              </Box>
            )}
          </Box>

          {/* Time Display */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 2, mt: -1 }}>
            <Typography variant="caption" color="text.secondary">
              {props.time}
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* Action Buttons */}
      <Box
        className="action-buttons"
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          opacity: 0,
          visibility: 'hidden',
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        <Tooltip title="Save" placement="right">
          <IconButton
            sx={{
              height: '48px',
              width: '48px',
              alignSelf: 'center',
              marginBottom: '8px',
            }}
            aria-label="save"
            onClick={handleBookmarkClick}
          >
            {bookmarked ? (
              <BookmarkIcon sx={{ fontSize: '28px', color: 'primary.main' }} />
            ) : (
              <BookmarkBorderIcon sx={{ fontSize: '28px' }} />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Like" placement="right">
          <IconButton
            sx={{
              height: '48px',
              width: '48px',
              alignSelf: 'center',
              marginBottom: '8px',
            }}
            aria-label="like"
            onClick={handleLikeClick}
          >
            {liked ? (
              <HeartIcon sx={{ fontSize: '28px', color: 'red' }} />
            ) : (
              <HeartBorderIcon sx={{ fontSize: '28px' }} />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Share" placement="right">
          <IconButton
            sx={{
              height: '48px',
              width: '48px',
              alignSelf: 'center',
            }}
            aria-label="share"
            onClick={() => setShowShareDialog(true)}
          >
            <ShareButton sx={{ fontSize: '28px' }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Share Dialog */}
      {showShareDialog && (
        <div ref={shareDialogRef}>
          <ShareDialog link={props.link} onClose={() => setShowShareDialog(false)} id="share-dialog" />
        </div>
      )}
    </Box>
  );
};

export default NewsCard;
