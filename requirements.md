~~line through~~

# STACK

## frontend

- react
- UI, React Bootstrap lub Material UI

## backend

- mongoDB
- express
- cors

### ogłoszenie:

- tytuł: min 10 znaków, maks 50 znaków
- treść: min 20 znaków, maks. 1000 znaków
- data publikacji
- zdjęcie
- cenę
- lokalizację, której dotyczy
- informacje o sprzedającym

### użytkownik:

- login
- hasło
- rehasło
- avatar
- numer telefonu

# FRONTEND:

- / strona główna z client/build
- apka frontendowa ma być w folderze client

### strona główna:

- wyświetlane tytuły ogłoszeń w kolejności chronologicznej (tytuł, zdjęcie i lokalizacja)
  public GET 127.0.0.1:3000/api/v1/ads

- możliwość przejścia do strony z danego ogłoszenia ze szczegółami
- dodać link do strony pojedyńczego ogłoszenia
  public GET 127.0.0.1:3000/api/v1/ads/69006395ad8f556f8ae2719e

- nad ogłoszeniami, dodać formularz do wyszukiwania ogłoszeń, po wpisaniu frazy i wciśnięciu Search przekierowanie do podstrony z wynikami wyszukiwania

- informacje wyszukiwania przekazać w adresie strony jako search/:searchPhrase
- po wciśnięciu search mamy być przekierowani do podstrony z wyszukanymi ogłoszeniami i przedstawić
  je w formie skróconej jako tytuł, zdjęcie, lokalizacja, cena

### podstrona pojedyńczego ogłoszenia

- wyświetlać tytuł, zdjęcia, lokalizację, opis, data publikacji
- zestaw informacji o sprzedającym: login, avatar, numer telefonu
- jeśli użytkownik jest zalogowany i wejdzie na podstronę postu należącego do niego to powinien
  mieć dostęp do buttonów edit i delete
- Edit, powinien przekierować do podstrony edycji tego postu, formularz ma mieć wypełnione pola
- Delete, powinien usunąć takie ogłoszenie i przekierować użytkownika na stronę główną

### podstrona do dodawania i edycji ogłoszeń

- ma być wręcz identyczna z podstroną edycji ogłoszenia tylko bez wypełnionych pól
- do obu podstron mogą mieć dostęp tylko zalogowani użytkownicy
- aby edytować lub usuwać ogłoszenie musimy być nie tylko zalogowani ale ogłoszenie musi należeć do nas

### podstrona rejestracji

- ma pozwalać na rejestrację użytkownika

### podstrona logowania

- ma pozwalać na logowanie użytkownika i rozpoczęcie sesji

### nawigacja

- na samej górze każdej podstrony powinna być nawigacja która będzie oferować linki:
  "Home", "Sign out" (gdy jest zalogowany), "Sign in" is "Sign up" (gdy nie jest zalogowany)

# BACKEND:

- serwer ma być odpowiedzialny za operację autentykacji i autoryzacji (logowanie i utrzymanie sesji)

## endpoints

### ogłoszenia

| Method | Name               | Access  | endpoint                         |
| ------ | ------------------ | ------- | -------------------------------- |
| GET    | getAll             | public  | /api/v1/ads                      |
| GET    | getById            | public  | /api/v1/ads/:id                  |
| GET    | searchByPhrase     | public  | /api/v1/ads/search/:searchPhrase |
| POST   | createAdvertisment | private | /api/v1/ads                      |
| DELETE | deleteById         | private | /api/v1/ads/:id                  |
| PUT    | updateById         | private | /api/v1/ads/:id                  |

### użytkownicy

| Method | Name       | Access | endpoint              |
| ------ | ---------- | ------ | --------------------- |
| POST   | createUser | public | /api/v1/auth/register |
| POST   | login      | public | /api/v1/auth/login    |
| GET    | getUser    | public | /api/v1/auth/user     |

# SUPPORT

- logowanie, autoryzacja i sesja będzie wytłumaczone
- dodawanie zdjęć będzie wytłumaczone

# PLAN

- w pierwszym tygodniu tylko backend
- w drugim tygodniu frontend
