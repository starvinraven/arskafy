(ns arskafy.core
  (:require [arskafy.web :as web]))

(defn -main
  []
  (web/start-server!))
