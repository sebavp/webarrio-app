package main

import (
  "encoding/json"
  "log"
  "net/http"
  "github.com/gorilla/mux"
)

func main(){
  router := mux.NewRouter()
  router.HandleFunc("/api/users/{user_id}", GetUser).Methods("GET")
  router.HandleFunc("/api/users/{user_id}", UpdateUser).Methods("PUT")
  router.HandleFunc("/api/users/{user_id}/image", UpdateUserImage).Methods("POST")
  router.HandleFunc("/api/users/{user_id}/events", GetUserEvents).Methods("GET")
  router.HandleFunc("/api/users/{user_id}/announcements", GetUserAnnouncements).Methods("GET")
  router.HandleFunc("/api/users/{user_id}/device", AddUserDevice).Methods("POST")
  router.HandleFunc("/api/users/by_home/{home_id}", GetUser).Methods("GET")
  router.HandleFunc("/api/users/add_to_home", AddUserToHome).Methods("POST")
  router.HandleFunc("/api/users/{user_id}/from_home/{home_id}", RemoveUserFromHome).Methods("DELETE")
  router.HandleFunc("/api/homes/{home_id}", GetHome).Methods("GET")
  router.HandleFunc("/api/homes/{home_id}/common_expenses", GetHomeCommonExpense).Methods("GET")
  router.HandleFunc("/api/homes/{home_id}/payments", GetHomePayments).Methods("GET")
  router.HandleFunc("/api/homes/{home_id}/payment", MakeHomePayment).Methods("POST")
  router.HandleFunc("/api/condos/{condo_id}", GetCondo).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/events", GetCondoEvents).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/events/{kind}", GetCondoEvents).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/events/{kind}", GetCondoEvents).Methods("POST")
  router.HandleFunc("/api/condos/{condo_id}/people", GetCondoPeople).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/contacts", GetCondoContacts).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/payments", GetCondoPayments).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/homes", GetCondoHomes).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/common_expenses", GetCondoCommonExpenses).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/common_expenses", GetCondoCommonExpensesTemplate).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/{year}/{month}", GetCondoCommonExpenseByMonth).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/common_expenses", AddCondoCommonExpenses).Methods("POST")
  router.HandleFunc("/api/condos/{condo_id}/contacts/{contact_id}", GetCondoContact).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/contacts/{contact_id}", ReviewContact).Methods("POST")
  router.HandleFunc("/api/condos/{condo_id}/contacts", AddContact).Methods("POST")
  router.HandleFunc("/api/condos/{condo_id}/sos", SendSOS).Methods("POST")
  router.HandleFunc("/api/condos/{condo_id}/send_chat", SendChat).Methods("POST")
  router.HandleFunc("/api/condos/{condo_id}/current_notices", GetNotices).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/announcements", GetAnnouncements).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/announcements/{kind}", GetAnnouncements).Methods("GET")
  router.HandleFunc("/api/condos/{condo_id}/announcements/{kind}", CreateAnnouncement).Methods("POST")
  router.HandleFunc("/api/announcements/{announcement_id}/image", UpdateAnnouncementImage).Methods("POST")
  router.HandleFunc("/api/announcements/{announcement_id}", GetUserAnnouncement).Methods("GET")
  router.HandleFunc("/api/current_notices/{notice_id}", UpdateNotices).Methods("PUT")
  router.HandleFunc("/api/events/{event_id}", GetEvent).Methods("GET")
  router.HandleFunc("/api/events/{event_id}", AddEventImage).Methods("POST")
  router.HandleFunc("/api/events/{event_id}/assistant", AddEventAssistant).Methods("POST")
  router.HandleFunc("/api/events/{event_id}/assistant/{user_id}", RemoveEventAssistant).Methods("DELETE")
  router.HandleFunc("/feed/{user_id}/{condo_id}", GetNotifications).Methods("GET")

  router.HandleFunc("/mailer/{form}", RenderForm).Methods("GET")
  router.HandleFunc("/manage/{condo_id}", Dashboard).Methods("GET")
  




  log.Fatal(http.ListenAndServe(":8000", rouer))
}
