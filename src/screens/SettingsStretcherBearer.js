import React, { Component } from "react";


function SettingsStretcherBearer(props) {
  return (
<Paper elevation={0} style={{ height: "100%" }}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} width='100%'>
                <TableContainer>
                  <Table style={{ border: 'none' }} size="small">
                    <TableBody style={{ border: 'none' }}>
                      <TableRow style={{ borderBottom: 'none' }}>
                        <TableCell className={classes.pageHeader} style={{ borderBottom: 'none' }}>
                          Gestion des brancardiers
                        </TableCell>
                        <TableCell style={{ borderBottom: 'none' }}>
                          <TextField id="input-with-icon-grid" className={classes.searchTextField} label="Recherche" onChange={handleFilterChange} value={userFilter}
                            InputProps={{
                              endAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" style={{ borderBottom: 'none' }}>
                          <div></div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.mainUserTableCell} style={{ verticalAlign: 'top' }} >
                <UserAccountsTable userAccounts={filteredUserAccounts} onSelectedAccountForEdit={handleSetAccountToEdit} />
              </TableCell>
              <TableCell className={classes.mainUserTableCell} style={{ verticalAlign: 'top' }} >
                {selectedAccount ?
                  <UserAccountDetails account={selectedAccount} />
                  :
                  <Paper>
                  <TableContainer>
                    <Table className={classes.userDetailSection} size="small" aria-label="caption table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeaderCell}>Details de compte utilisateur</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.userDetailCell} >
                          <TextField id="user-edit-first-name" label="Prénom" style={{ width: '100%' }} disabled />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField id="user-edit-last-name" label="Nom de famille" disabled style={{ width: '100%' }} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField
                            id="user-edit-role"
                            select
                            label="Role"
                            value=""
                            disabled
                            style={{ width: '50%' }}
                          >
                            {roles.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField id="user-edit-email" label="Courriel" disabled style={{ width: '100%' }} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField id="standard-required" label="Cellulaire" disabled />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='right' >
                          <Button variant="contained" color="primary" disabled >
                            Sauvegarder
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField id="user-edit-temp-pwd" label="Mot de passe temporaire" disabled style={{ width: '100%' }} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='right' >
                          <Button variant="contained" color="primary" disabled >
                            Appliquer
                           </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table></TableContainer></Paper>
                }
              </TableCell>

            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.pageHeader} style={{ borderBottom: 'none' }}>
                        Gestion des roles
                      </TableCell>
                      <TableCell align="right" style={{ borderBottom: 'none' }}>
                        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
                          Nouveau role
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ borderBottom: 'none', verticalAlign: 'top' }} className={classes.rolesRable}>
                        <RolesTable roles={roles} onSelectedRoleForEdit={handleSetRoleToEdit} />
                      </TableCell>
                      <TableCell style={{ borderBottom: 'none', verticalAlign: 'top' }}>
                        {selectedRole ?
                          <RoleDetails role={selectedRole} />
                          :
                          <Grid container spacing={1}>
                            <Grid container item xs={12} spacing={3}>
                              <React.Fragment>
                                <Grid item xs={4}>
                                  <TextField id="edit-role-name" label="Identifiant" disabled style={{ width: '100%' }} />
                                </Grid>
                              </React.Fragment>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                              <React.Fragment>
                                <Grid item xs={6}>
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Administration
              </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="ROLE_SETTINGS_MANAGE_ACCOUNTS"
                                          color="primary"
                                        />
                                      }
                                      label="Gestion des comptes utilisateurs"
                                    />
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Restrictions
              </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="ROLE_SETTINGS_GEO_FENCED"
                                          color="primary"
                                        />
                                      }
                                      label="Accès application mobile seulement dans le périmètre."
                                    />
                                  </Paper>
                                </Grid>
                              </React.Fragment>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                              <React.Fragment>
                                <Grid item xs={4}>
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Module Lits
              </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEDS_VIEW"
                                          color="primary"
                                        />
                                      }
                                      label="Visualiser l'état des lits."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEDS_UPDATE"
                                          color="primary"
                                        />
                                      }
                                      label="Modifier l'état des lits."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEDS_CONFIG_FLOOR"
                                          color="primary"
                                        />
                                      }
                                      label="Configurer les lits sur les étages."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEDS_CONFIG_BED"
                                          color="primary"
                                        />
                                      }
                                      label="Configurer l'informatino des lits."
                                    />
                                  </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Module Brancarderie
              </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEARER_VIEW"
                                          color="primary"
                                        />
                                      }
                                      label="Visualiser l'état des demandes."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEARER_UPDATE"
                                          color="primary"
                                        />
                                      }
                                      label="Modifier l'état des demandes."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEARER_CONFIG"
                                          color="primary"
                                        />
                                      }
                                      label="Configuration des équipes."
                                    />
                                  </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Module Nettoyage et salubrité
              </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_CLEANER_VIEW"
                                          color="primary"
                                        />
                                      }
                                      label="Visualiser l'état des demandes."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_CLEANER_UPDATE"
                                          color="primary"
                                        />
                                      }
                                      label="Modifier l'état des demandes."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_CLEANER_CONFIG"
                                          color="primary"
                                        />
                                      }
                                      label="Configuration des équipes."
                                    />
                                  </Paper>
                                </Grid>
                              </React.Fragment>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                              <React.Fragment>
                                <Grid item xs={4}>
                                  <Button variant="contained" color="primary" disabled>
                                    Sauvegarder
                </Button>
                                </Grid>
                              </React.Fragment>
                            </Grid>
                          </Grid>
                        }
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default SettingsStretcherBearer;
