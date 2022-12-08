<template>
  <v-dialog v-model="open">
    <v-card>
      <v-btn @click="open = false" class="close-btn" color="red"> X </v-btn>
      <loader v-if="loading" />
      <div v-else>
        <v-card-text>
          <h2>Stacktrace</h2>
          <div class="d-flex">
            <v-chip class="mr-2 mt-2" color="primary">Service class/file</v-chip
            ><v-chip class="ma-2" color="orange">Vendor class/file</v-chip
            ><v-chip class="ma-2" color="red">Laravel class/file</v-chip>
          </div>
        </v-card-text>
        <v-timeline side="end" align="start">
          <v-timeline-item
            v-for="(trace, i) in stacktrace"
            :dot-color="getDotColor(trace.file)"
            size="small"
          >
            <div class="d-flex">
              <div>
                <div>
                  <strong>At</strong> line {{ trace.line }} in {{ trace.file }}
                </div>
                <div>
                  <strong>Class: </strong>{{ trace.class }}{{ trace.type
                  }}{{ trace.function }}
                </div>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>

        <v-card-actions>
          <v-btn color="red" block @click="open = false">Close Dialog</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import loader from "@/components/common/loading.vue";
const open = ref(false);
const loading = ref(false);
const stacktrace = ref([]);

const openDialog = function openCurl(stacktraceLink) {
  stacktrace.value = getStacktrace(stacktraceLink);
  console.log(stacktrace.value);
  open.value = true;
};

function getStacktrace(stacktraceLink) {
  loading.value = true;

  loading.value = false;

  return [
    {
      file: "/var/www/html/vendor/guzzlehttp/guzzle/src/Middleware.php",
      line: 69,
      function: "create",
      class: "GuzzleHttp\\Exception\\RequestException",
      type: "::",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/promises/src/Promise.php",
      line: 204,
      function: "GuzzleHttp\\{closure}",
      class: "GuzzleHttp\\Middleware",
      type: "::",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/promises/src/Promise.php",
      line: 153,
      function: "callHandler",
      class: "GuzzleHttp\\Promise\\Promise",
      type: "::",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/promises/src/TaskQueue.php",
      line: 48,
      function: "GuzzleHttp\\Promise\\{closure}",
      class: "GuzzleHttp\\Promise\\Promise",
      type: "::",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/guzzle/src/Handler/CurlMultiHandler.php",
      line: 158,
      function: "run",
      class: "GuzzleHttp\\Promise\\TaskQueue",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/guzzle/src/Handler/CurlMultiHandler.php",
      line: 183,
      function: "tick",
      class: "GuzzleHttp\\Handler\\CurlMultiHandler",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/promises/src/Promise.php",
      line: 248,
      function: "execute",
      class: "GuzzleHttp\\Handler\\CurlMultiHandler",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/promises/src/Promise.php",
      line: 224,
      function: "invokeWaitFn",
      class: "GuzzleHttp\\Promise\\Promise",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/promises/src/Promise.php",
      line: 269,
      function: "waitIfPending",
      class: "GuzzleHttp\\Promise\\Promise",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/promises/src/Promise.php",
      line: 226,
      function: "invokeWaitList",
      class: "GuzzleHttp\\Promise\\Promise",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/promises/src/Promise.php",
      line: 62,
      function: "waitIfPending",
      class: "GuzzleHttp\\Promise\\Promise",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/guzzle/src/Client.php",
      line: 187,
      function: "wait",
      class: "GuzzleHttp\\Promise\\Promise",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/guzzlehttp/guzzle/src/ClientTrait.php",
      line: 95,
      function: "request",
      class: "GuzzleHttp\\Client",
      type: "->",
    },
    {
      file: "/var/www/html/app/Services/RelatelSMSProvider.php",
      line: 79,
      function: "post",
      class: "GuzzleHttp\\Client",
      type: "->",
    },
    {
      file: "/var/www/html/app/Console/Commands/ProcessSmsCommand.php",
      line: 61,
      function: "send",
      class: "App\\Services\\RelatelSMSProvider",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Database/Concerns/BuildsQueries.php",
      line: 141,
      function: "App\\Console\\Commands\\{closure}",
      class: "App\\Console\\Commands\\ProcessSmsCommand",
      type: "->",
    },
    {
      file: "/var/www/html/app/Console/Commands/ProcessSmsCommand.php",
      line: 86,
      function: "chunkById",
      class: "Illuminate\\Database\\Eloquent\\Builder",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php",
      line: 36,
      function: "handle",
      class: "App\\Console\\Commands\\ProcessSmsCommand",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Container/Util.php",
      line: 41,
      function: "Illuminate\\Container\\{closure}",
      class: "Illuminate\\Container\\BoundMethod",
      type: "::",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php",
      line: 93,
      function: "unwrapIfClosure",
      class: "Illuminate\\Container\\Util",
      type: "::",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php",
      line: 37,
      function: "callBoundMethod",
      class: "Illuminate\\Container\\BoundMethod",
      type: "::",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Container/Container.php",
      line: 651,
      function: "call",
      class: "Illuminate\\Container\\BoundMethod",
      type: "::",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php",
      line: 136,
      function: "call",
      class: "Illuminate\\Container\\Container",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/symfony/console/Command/Command.php",
      line: 291,
      function: "execute",
      class: "Illuminate\\Console\\Command",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php",
      line: 121,
      function: "run",
      class: "Symfony\\Component\\Console\\Command\\Command",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/symfony/console/Application.php",
      line: 998,
      function: "run",
      class: "Illuminate\\Console\\Command",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/symfony/console/Application.php",
      line: 299,
      function: "doRunCommand",
      class: "Symfony\\Component\\Console\\Application",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/symfony/console/Application.php",
      line: 171,
      function: "doRun",
      class: "Symfony\\Component\\Console\\Application",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Console/Application.php",
      line: 102,
      function: "run",
      class: "Symfony\\Component\\Console\\Application",
      type: "->",
    },
    {
      file: "/var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Console/Kernel.php",
      line: 129,
      function: "run",
      class: "Illuminate\\Console\\Application",
      type: "->",
    },
    {
      file: "/var/www/html/artisan",
      line: 37,
      function: "handle",
      class: "Illuminate\\Foundation\\Console\\Kernel",
      type: "->",
    },
  ];
}

function getDotColor(file) {
  if (file.includes("Illuminate")) return "red";
  if (file.includes("vendor")) return "orange";

  return "primary";
}

defineExpose({
  openDialog,
});
</script>

<style>
.close-btn {
  position: absolute;
  top: 0%;
  right: 0%;
}
</style>
