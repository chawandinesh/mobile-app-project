terraform {
  backend "azurerm" {
    container_name = "state"
    key            = "snap-mobile-app-c8bb0ece-792b-4276-9c49-d43490e2dd56"
  }
}
provider "azurerm" {
  features {}
  tenant_id       = var.tenant_id
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
}
resource "azurerm_resource_group" "main" {
  name     = "${local.name_prefix}-rg"
  location = local.location
  tags     = local.tags
}