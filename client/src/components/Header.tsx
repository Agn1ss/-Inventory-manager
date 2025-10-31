import React, { useState } from "react";
import { Navbar, Container, Button, FormControl, Nav, Dropdown } from "react-bootstrap";
import { useThisUserStore } from "../store/thisUserStore";
import { useSettingsStore } from "../store/useSettingsStore";
import { useTranslation } from "react-i18next";
import ModalBox from "./modals/ModalBox";
import AuthModal from "./modals/AuthModal";

export default function Header() {
  const { theme, toggleTheme, language, setLanguage } = useSettingsStore();
  const { isAuth, logout } = useThisUserStore();
  const { t, i18n } = useTranslation();

  const [showLogin, setShowLogin] = useState(false);

  const handleLanguageChange = (lang: "en" | "ru") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <header className="w-100 fixed-top shadow">
        <Navbar expand="lg" className="py-3 px-2">
          <Container
            fluid
            className="position-relative d-flex justify-content-between align-items-center"
          >
            <Button style={{ minWidth: "50px" }} variant="secondary" onClick={toggleTheme}>
              {theme === "light" ? "🌞" : "🌜"}
            </Button>

            <FormControl
              type="search"
              placeholder={t("search_inv")}
              className="position-absolute start-50 translate-middle-x"
              style={{ maxWidth: "300px" }}
            />

            <Nav className="d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" className="me-2">
                  {language.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: "auto" }}>
                  <Dropdown.Item onClick={() => handleLanguageChange("en")}>EN</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange("ru")}>RU</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {isAuth ? (
                <Button variant="outline-danger" style={{ minWidth: "80px" }} onClick={logout}>
                  {t("logout")}
                </Button>
              ) : (
                <Button
                  variant="outline-success"
                  style={{ minWidth: "70px" }}
                  onClick={() => setShowLogin(true)}
                >
                  {t("login")}
                </Button>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>

      <ModalBox show={showLogin} title={t("sign_or_log")} onClose={() => setShowLogin(false)}>
        <AuthModal setShowLogin={setShowLogin} />
      </ModalBox>
    </>
  );
}