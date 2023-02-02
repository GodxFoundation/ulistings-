import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'
import { useTheme, useTranslations } from 'dopenative'
import dynamicStyles from './styles'

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

function ProfileImageCard(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { user, onImagePress, disabled } = props
  const [imgErr, setImgErr] = useState(false)
  const lastName = user.lastName ? user.lastName : ''
  const firstName = user.firstName ? user.firstName : user.fullname
  const fullName = `${firstName} ${lastName}`

  const onImageError = () => {
    setImgErr(true)
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onImagePress}
        style={styles.cardImageContainer}>
        <FastImage
          onError={onImageError}
          source={
            imgErr ? { uri: defaultAvatar } : { uri: user.profilePictureURL }
          }
          style={[
            styles.cardImage,
            !user.profilePictureURL && { tintColor: 'grey' },
          ]}
        />
      </TouchableOpacity>
      <View style={styles.cardNameContainer}>
        <Text style={styles.cardName}>{fullName}</Text>
      </View>
    </View>
  )
}

ProfileImageCard.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object,
  onImagePress: PropTypes.func,
  extraData: PropTypes.object,
  user: PropTypes.object,
  disabled: PropTypes.bool,
}

export default ProfileImageCard
