<template>
  <div>
    <v-card>
      <v-text-field
        clearable
        label="Search for exception or file"
      ></v-text-field>

      <loader v-if="loading" />
      <stacktraceList :traces="traces" v-else />

      <div class="text-center pt-5">
        <v-pagination
          rounded="circle"
          v-model="page"
          :length="maxPages"
          :total-visible="10"
        ></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import stacktraceList from "@/components/service/ui/stacktraceList.vue";
import loader from "@/components/common/loading.vue";
import { ref } from "vue";

const loading = ref(false);

const page = ref(1);
const maxPages = ref(100);

const traces = ref([
  {
    message: "Call to a member function getOption() on null",
    count: 500,
    statusCode: 400,
    url: "http://advisering.coolrunner.test",
    exception: "Symfony\\Component\\Mailer\\Exception\\TransportException",
    file: "/var/www/html/app/Models/Carriers/SDK/SDK.php",
    line: 70,
    stacktraceLink:
      "https://s3.eu-central-1.amazonaws.com/cr-errors/advisering/2022-12-06/7701b5b7bcffebfa51798036bd61f25b.json",
    params: {
      receiver: {
        name: "test",
        attention: "",
        street1: "Jerichausgade 5",
        street2: "",
        zip_code: "8000",
        city: "Aarhus",
        country: "DK",
        phone: "23440304",
        email: "test@coolrunner.dk",
        notify_sms: "",
      },
    },
  },
  {
    message:
      'Expected response code "250/251/252" but got code "501", with message "501 Recipient syntax error".',
    count: 100,
    statusCode: 501,
    url: "http://advisering.coolrunner.test",
    exception: "Symfony\\Component\\Mailer\\Exception\\TransportException",
    file: "/var/www/html/vendor/symfony/mailer/Transport/Smtp/SmtpTransport.php",
    line: 308,
  },
  {
    message:
      'Email "MAIL@hotmail.com" does not comply with addr-spec of RFC 2822.',
    count: 2,
    statusCode: 0,
    url: "http://advisering.coolrunner.test",
    exception: "Symfony\\Component\\Mime\\Exception\\RfcComplianceException",
    file: "/var/www/html/vendor/symfony/mime/Address.php",
    line: 54,
  },
  {
    message:
      'Email "MAIL@hotmail.com" does not comply with addr-spec of RFC 2822.',
    count: 200,
    statusCode: 200,
    url: "http://advisering.coolrunner.test",
    exception: "Symfony\\Component\\Mime\\Exception\\RfcComplianceException",
    file: "/var/www/html/vendor/symfony/mime/Address.php",
    line: 54,
  },
]);
</script>
