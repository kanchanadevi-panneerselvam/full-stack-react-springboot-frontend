import axios from "axios";

class HelloWorldService {
  executeHelloWorldService() {
    return axios.get("http://localhost:8080/hello_world/");
  }
// checking git fetch and merge
  executeHelloWorldBeanService() {
    return axios.get("http://localhost:8080/hello_world_bean/");
  }

  executeHelloWorldPathVariableService(name) {
    return axios.get(`http://localhost:8080/hello_world/path_variable/${name}`);
  }
}

export default new HelloWorldService();
