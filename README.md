README.md

# WeBarrio

### GENERATE UNSIGNED APK
 `cordova build --release android`

### SIGN CURRENT APK
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore zetabyte.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk zb_alias `

IF there is builded apk remove it
`rm platforms/android/build/outputs/apk/webarrio-beta-release.apk `

#ZIPALIGN SIGNED APK
`~/Library/Android/sdk/build-tools/23.0.2/zipalign  -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk  platforms/android/build/outputs/apk/webarrio-beta-release.apk  `