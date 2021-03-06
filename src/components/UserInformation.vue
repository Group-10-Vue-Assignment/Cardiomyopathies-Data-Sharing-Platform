<template>
  Hello {{ userProfile.name }} from {{ userProfile.institution }}, these are
  your user details and available graph data.
</template>

<script>
import getUserDetails from "../firebaseFunctions/getUserDetails.js";
export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  async setup(props) {
    //will get other use details such as phone number, address institution
    const userProfile = await getUserDetails(props.userId);
    console.log(userProfile);
    return {
      userProfile
    };
  }
};
</script>
