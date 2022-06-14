output "app_service_name" {
  value = azurerm_app_service.main.name
}

output "app_service_rg_name" {
  value = azurerm_resource_group.main.name
}