import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, G, Circle, Path, Image, ClipPath, RadialGradient, Ellipse, Pattern, Text, Rect } from 'react-native-svg';
import { Size } from '../../Utils/FontSize';
import { Colors } from '../../Utils/Colors';

export { EyeCloseIcon, EyeOpenIcon, Search };

const EyeCloseIcon = ({ close = true, size = Size.L }) => (
  <Svg width={size} height={size} viewBox="0 0 16.417 14.074">
    <G data-name="Icon ionic-ios-eye-off" opacity={0.35}>
      <Path data-name="Path 104" fill="#000" d="M2.062.151a.521.521 0 0 0-.737.737l13.03 13.036a.516.516 0 0 0 .5.132.508.508 0 0 0 .235-.136.52.52 0 0 0 0-.733Z" />
      <G data-name="Group 106">
        <Path data-name="Path 105" fill="#000" d="M8.362 10.335a3.3 3.3 0 0 1-3.134-4.706L3.272 3.666a25.708 25.708 0 0 0-3.124 2.98.579.579 0 0 0 0 .781c2.379 2.628 4.475 4.889 8.052 4.889a7.057 7.057 0 0 0 3.016-.7l-1.594-1.594a3.33 3.33 0 0 1-1.26.313Z" />
        <Path data-name="Path 106" fill="#000" d="M16.265 7.404a.575.575 0 0 0 .018-.759C14.366 4.318 11.709 1.76 8.202 1.76a6.861 6.861 0 0 0-3.005.7l1.6 1.6a3.229 3.229 0 0 1 1.257-.315 3.3 3.3 0 0 1 3.134 4.706l1.961 1.961a24.243 24.243 0 0 0 3.116-3.008Z" />
        <Path data-name="Path 107" fill="#000" d="M5.871 7.217A2.355 2.355 0 0 0 8.03 9.376a2.291 2.291 0 0 0 .858-.1l-2.925-2.92a2.4 2.4 0 0 0-.092.861Z" />
        <Path data-name="Path 108" fill="#000" d="M10.555 7.038v-.143a1.625 1.625 0 0 1-.667.143h-.114l.682.685a2.343 2.343 0 0 0 .099-.685Z" />
        <Path data-name="Path 109" fill="red" d="M8.209 5.315a1.722 1.722 0 0 1 .114-.619h-.114a2.319 2.319 0 0 0-.678.1l.685.685c-.003-.056-.007-.111-.007-.166Z" />
      </G>
    </G>
  </Svg>
);
const EyeOpenIcon = ({ size = Size.L }) => (
  <Svg width={size} height={size} viewBox="0 0 16.417 10.553">
    <G data-name="Icon ionic-ios-eye">
      <Path data-name="Path 3913" fill="#000" d="M8.199 0C5.253 0 2.93 1.854.152 4.884a.579.579 0 0 0 0 .78c2.378 2.627 4.474 4.888 8.05 4.888 3.532 0 6.182-2.847 8.065-4.91a.575.575 0 0 0 .018-.758C14.363 2.558 11.706 0 8.199 0Zm.161 8.571a3.3 3.3 0 1 1 3.14-3.14 3.3 3.3 0 0 1-3.139 3.14Z" />
      <Path data-name="Path 3914" fill="#000" d="M8.207 3.554a1.722 1.722 0 0 1 .114-.619h-.114a2.345 2.345 0 1 0 2.345 2.345v-.143a1.625 1.625 0 0 1-.667.143 1.7 1.7 0 0 1-1.678-1.726Z" />
    </G>
  </Svg>
);

function Search({ size, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 19.731 19.731">
      <G data-name="Icon feather-search" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path data-name="Path 5" d="M16.392 8.7a7.7 7.7 0 11-7.7-7.7 7.7 7.7 0 017.7 7.7z" />
        <Path data-name="Path 6" d="M18.317 18.317l-4.185-4.185" />
      </G>
    </Svg>
  );
}

export const AccountReward = () => (
  <Svg width={34} height={34}>
    <G transform="translate(-15 -539)">
      <Circle data-name="Ellipse 165" cx={17} cy={17} r={17} transform="translate(15 539)" fill="#fef4e7" />
      <Path data-name="Path 3930" d="M20 544h25v25H20Z" fill="none" />
      <G data-name="Icon ionic-md-time" fill="#fc9200" stroke="#fef4e7" strokeWidth={0.8}>
        <Path data-name="Path 13562" d="M32.489 545A11.5 11.5 0 1 0 44 556.5 11.5 11.5 0 0 0 32.489 545Zm.011 20.7a9.2 9.2 0 1 1 9.2-9.2 9.2 9.2 0 0 1-9.2 9.2Z" />
        <Path data-name="Path 13563" d="M33.075 550.751H31.35v6.9l6.037 3.621.862-1.415-5.175-3.069Z" />
      </G>
    </G>
  </Svg>
);

export const AccountRefer = () => (
  <Svg width={34} height={34}>
    <Defs>
      <ClipPath id="a">
        <Path data-name="Rectangle 18430" fill="#fc9200" d="M0 0h21v17.737H0z" />
      </ClipPath>
    </Defs>
    <G transform="translate(-15 -395)">
      <Circle data-name="Ellipse 162" cx={17} cy={17} r={17} transform="translate(15 395)" fill="#fef4e7" />
      <G data-name="Group 10036">
        <G data-name="Group 10035" clipPath="url(#a)" fill="#fc9200" transform="translate(22 403)">
          <Path data-name="Path 13548" d="M5.562 7.174a1.309 1.309 0 0 0 1.8-1.186 1.312 1.312 0 0 0-2.469-.65 1.276 1.276 0 0 0-.155.6 1.315 1.315 0 0 0 .827 1.238" />
          <Path data-name="Path 13549" d="M8.673 8.257v.049a3.025 3.025 0 0 1-5.251 0V8.24a.7.7 0 0 1 .129-.42.747.747 0 0 1 .183-.176 4.42 4.42 0 0 1 1.023-.529l.056.059a1.732 1.732 0 0 0 1.232.519h.012a1.735 1.735 0 0 0 1.285-.585 3.854 3.854 0 0 1 1.029.54.706.706 0 0 1 .3.61" />
          <Path data-name="Path 13550" d="M6.047 2.844a3.958 3.958 0 1 0 3.958 3.958 3.963 3.963 0 0 0-3.958-3.958m0 7.316a3.358 3.358 0 1 1 3.358-3.358 3.362 3.362 0 0 1-3.358 3.358" />
          <Path data-name="Path 13551" d="M14.393 11.301a1.261 1.261 0 0 0 1.731-1.142 1.264 1.264 0 0 0-2.379-.626 1.23 1.23 0 0 0-.149.577 1.267 1.267 0 0 0 .8 1.192" />
          <Path data-name="Path 13552" d="M17.39 12.344v.047a2.914 2.914 0 0 1-5.059 0v-.068a.675.675 0 0 1 .124-.4.719.719 0 0 1 .176-.169 4.257 4.257 0 0 1 .985-.51l.054.057a1.669 1.669 0 0 0 1.187.5h.012a1.671 1.671 0 0 0 1.238-.564 3.714 3.714 0 0 1 .991.52.68.68 0 0 1 .292.587" />
          <Path data-name="Path 13553" d="M14.861 7.129a3.813 3.813 0 1 0 3.813 3.813 3.818 3.818 0 0 0-3.813-3.813m0 7.048a3.235 3.235 0 1 1 3.235-3.235 3.238 3.238 0 0 1-3.235 3.235" />
          <Path data-name="Path 13554" d="M6.809 13.595a6.817 6.817 0 0 1-5.682-3.047 6.8 6.8 0 0 1 11.049-7.9.486.486 0 0 1-.123.7.489.489 0 0 1-.655-.112A5.821 5.821 0 1 0 9.6 11.9a.489.489 0 0 1 .646.158.49.49 0 0 1-.175.7 6.734 6.734 0 0 1-3.262.843" />
          <Path data-name="Path 13555" d="M14.211 17.738a6.8 6.8 0 0 1-5.392-2.642.488.488 0 0 1 .778-.59 5.821 5.821 0 1 0 1.8-8.664.489.489 0 0 1-.646-.158.486.486 0 0 1 .167-.692 6.8 6.8 0 1 1 3.3 12.747" />
          <Path data-name="Path 13556" d="m11.656 9.569-1.057-1.158.036.435-1.14-.541-.185.389 1.14.541-.36.247Z" />
        </G>
      </G>
    </G>
  </Svg>
);

export const AccountPolicy = () => (
  <Svg width={34} height={34}>
    <G transform="translate(-15 -760)">
      <Circle data-name="Ellipse 165" cx={17} cy={17} r={17} transform="translate(15 760)" fill={Colors.primary} />
      <Path data-name="Path 3930" d="M20 765h25v25H20Z" fill="none" />
      <Path data-name="Path 3931" d="M39.111 786.352H24.889a.9.9 0 0 1-.889-.918v-16.516a.9.9 0 0 1 .889-.918h14.222a.9.9 0 0 1 .889.918v16.516a.9.9 0 0 1-.889.918ZM27.556 771.67v3.67h3.556v-3.67Zm0 5.505v1.835h8.889v-1.834Zm0 3.67v1.835h8.889v-1.834Zm5.333-8.258v1.836h3.556v-1.835Z" fill="none" stroke="#fff" />
    </G>
  </Svg>
);

export const AccountPassword = () => (
  <Svg width={34} height={34}>
    <G transform="translate(-15 -466)">
      <Circle data-name="Ellipse 163" cx={17} cy={17} r={17} transform="translate(15 466)" fill={Colors.primary} />
      <Path data-name="Icon awesome-lock" d="M38.083 481.667h-.875v-2.625a5.542 5.542 0 0 0-11.083 0v2.625h-.875a1.75 1.75 0 0 0-1.75 1.749v7a1.75 1.75 0 0 0 1.75 1.75h12.833a1.75 1.75 0 0 0 1.75-1.75v-7a1.75 1.75 0 0 0-1.75-1.749Zm-3.792 0h-5.249v-2.625a2.625 2.625 0 1 1 5.25 0Z" fill="none" stroke="#fff" strokeWidth={1.1} />
    </G>
  </Svg>
);

export const AccountLogout = () => (
  <Svg width={34} height={34}>
    <G transform="translate(-15 -909)">
      <Circle data-name="Ellipse 166" cx={17} cy={17} r={17} transform="translate(15 909)" fill={Colors.primary} />
      <G data-name="Group 3330" fill="#fff" stroke="#fff" strokeWidth={0.2}>
        <Path data-name="Path 3594" d="M34.598 934.289h-6.191c-1.682 0-3.047-1.059-3.047-2.355v-11.528c0-1.3 1.37-2.355 3.047-2.355h6.291a.615.615 0 0 0 .683-.526.615.615 0 0 0-.682-.525h-6.292c-2.433 0-4.407 1.53-4.407 3.406v11.529c0 1.88 1.98 3.406 4.407 3.406h6.191a.543.543 0 1 0 0-1.051Z" />
        <Path data-name="Path 3595" d="m40.812 925.742-4.065-3.856a.662.662 0 0 0-.9 0 .583.583 0 0 0 0 .858l2.975 2.822H25.843a.608.608 0 1 0 0 1.213h12.975l-2.975 2.822a.583.583 0 0 0 0 .858.662.662 0 0 0 .45.18.641.641 0 0 0 .45-.18l4.065-3.856a.585.585 0 0 0 .004-.861Z" />
      </G>
    </G>
  </Svg>
);

export const AccountContact = () => (
  <Svg width={34} height={34}>
    <G transform="translate(-15 -612)">
      <Circle data-name="Ellipse 165" cx={17} cy={17} r={17} transform="translate(15 612)" fill={Colors.primary} />
      <Path data-name="Path 3930" d="M20 617h25v25H20Z" fill="none" />
      <G data-name="Icon feather-mail" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}>
        <Path data-name="Path 13557" d="M25.583 623H38.25a1.588 1.588 0 0 1 1.583 1.583v9.5a1.588 1.588 0 0 1-1.583 1.583H25.583A1.588 1.588 0 0 1 24 634.083v-9.5A1.588 1.588 0 0 1 25.583 623Z" />
        <Path data-name="Path 13558" d="m39.833 624.583-7.917 5.542L24 624.583" />
      </G>
    </G>
  </Svg>
);

export const AccountFaq = () => (
  <Svg width={34} height={34}>
    <G transform="translate(-15 -685)">
      <Circle data-name="Ellipse 164" cx={17} cy={17} r={17} transform="translate(15 685)" fill={Colors.primary} />
      <Path data-name="Icon metro-question" d="M30.688 705.938h2.625v2.625h-2.625Zm5.25-9.188a1.313 1.313 0 0 1 1.313 1.313V702l-3.937 2.625h-2.626v-1.312l3.942-2.625v-1.316h-6.567v-2.622h7.875Zm-3.937-3.278a8.531 8.531 0 1 0 6.029 2.5 8.475 8.475 0 0 0-6.033-2.5Zm0-1.969a10.5 10.5 0 1 1-10.5 10.5 10.5 10.5 0 0 1 10.5-10.5Z" fill="#fff" stroke="#fff" strokeWidth={0} />
    </G>
  </Svg>
);

export const AccountDelete = () => (
  <Svg width={34} height={34}>
    <G transform="translate(-15 -833)">
      <Circle data-name="Ellipse 165" cx={17} cy={17} r={17} transform="translate(15 833)" fill={Colors.primary} />
      <Path data-name="Path 3930" d="M20 838h25v25H20Z" fill="none" />
      <G data-name="Icon feather-user-minus" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}>
        <Path data-name="Path 13545" d="M35.417 856.7v-1.523a3.044 3.044 0 0 0-3.045-3.044h-5.328A3.044 3.044 0 0 0 24 855.177v1.522" />
        <Path data-name="Path 13546" d="M32.753 846.044A3.044 3.044 0 1 1 29.708 843a3.044 3.044 0 0 1 3.045 3.044Z" />
        <Path data-name="Path 13547" d="M40.745 849.089h-4.567" />
      </G>
    </G>
  </Svg>
);

export const AccountEmail = () => (
  <Svg width={34} height={34}>
    <G transform="translate(-15 -532)">
      <Circle data-name="Ellipse 186" cx={17} cy={17} r={17} transform="translate(15 532)" fill={Colors.primary} />
      <G data-name="Icon feather-mail" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}>
        <Path data-name="Path 13557" d="M25.583 543H38.25a1.588 1.588 0 0 1 1.583 1.583v9.5a1.588 1.588 0 0 1-1.583 1.583H25.583A1.588 1.588 0 0 1 24 554.083v-9.5A1.588 1.588 0 0 1 25.583 543Z" />
        <Path data-name="Path 13558" d="m39.833 544.583-7.917 5.542L24 544.583" />
      </G>
    </G>
  </Svg>
);

export const AccountHome = size => (
  <Svg width={34} height={34}>
    <G data-name="Group 10088" transform="translate(-14 -358)">
      <Circle data-name="Ellipse 188" cx={17} cy={17} r={17} transform="translate(14 358)" fill={Colors.primary} />
      <G data-name="Icon feather-user-minus" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <Path data-name="Path 13545" d="M37.917 383.7v-1.856a3.711 3.711 0 0 0-3.711-3.711h-6.495A3.711 3.711 0 0 0 24 381.844v1.856" />
        <Path data-name="Path 13546" d="M34.669 370.711A3.711 3.711 0 1 1 30.958 367a3.711 3.711 0 0 1 3.711 3.711Z" />
      </G>
    </G>
  </Svg>
);
